
const crypto = require('crypto');

// Configurações do Teste
const BASE_URL = 'http://localhost:6001';
const CONCURRENCY = 50; // Usuários simultâneos (Recomendado para Dev)
const DURATION_SECONDS = 30; // Duração do teste
const THINK_TIME_MS = 100; // Tempo entre requisições de um mesmo usuário

// Métricas Globais
const stats = {
  requests: 0,
  success: 0,
  failures: 0,
  errors: {},
  latencies: [],
  startTime: Date.now()
};

// Rotas para testar (GET)
const PUBLIC_ROUTES = [
  '/',
  '/team/real-madruga',
  '/team/real-madruga/store',
  '/auth/login',
  '/auth/register',
  '/legal/privacy'
];

// Dados para teste de login
const TEST_USER = {
  email: 'admin@meutime.com',
  password: '123456' // Senha correta descoberta
};

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function makeRequest(url, method = 'GET', body = null, headers = {}) {
  const start = Date.now();
  stats.requests++;

  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${BASE_URL}${url}`, options);
    const latency = Date.now() - start;
    stats.latencies.push(latency);

    if (response.ok) {
      stats.success++;
      return { ok: true, status: response.status, data: await response.text() }; // text() para evitar erro de parse em 204/html
    } else {
      stats.failures++;
      const status = response.status;
      stats.errors[status] = (stats.errors[status] || 0) + 1;
      return { ok: false, status };
    }
  } catch (error) {
    stats.failures++;
    const msg = error.code || error.message;
    stats.errors[msg] = (stats.errors[msg] || 0) + 1;
    return { ok: false, error };
  }
}

async function userScenario(userId) {
  const endTime = Date.now() + (DURATION_SECONDS * 1000);
  
  while (Date.now() < endTime) {
    // 1. Navegação Pública Aleatória
    const randomRoute = PUBLIC_ROUTES[Math.floor(Math.random() * PUBLIC_ROUTES.length)];
    await makeRequest(randomRoute);
    await delay(THINK_TIME_MS);

    // 2. Tentativa de Login (20% de chance)
    if (Math.random() < 0.2) {
      const loginRes = await makeRequest('/api/auth/login', 'POST', TEST_USER);
      
      if (loginRes.ok) {
        try {
            const data = JSON.parse(loginRes.data);
            const token = data.token;
            
            // 3. Ações Autenticadas (se login sucesso)
            if (token) {
                const authHeaders = { 'Cookie': `auth_token=${token}` }; // Simula cookie enviando no header (backend espera cookie)
                // Nota: fetch nativo não envia cookie automaticamente a menos que configuremos 'credentials', mas aqui estamos rodando no node.
                // O backend lê cookies().get('auth_token'). Vamos tentar passar via header Cookie manual.
                
                await makeRequest('/api/auth/me', 'GET', null, { Cookie: `auth_token=${token}` });
                await delay(THINK_TIME_MS);
                
                await makeRequest('/api/settings', 'GET', null, { Cookie: `auth_token=${token}` });
            }
        } catch (e) {
            // Ignora erro de parse se não for JSON
        }
      }
    }
    
    // 3. Busca de Time (API)
    await makeRequest('/api/team');
    await delay(THINK_TIME_MS);
  }
}

async function runStressTest() {
  console.log(`🚀 Iniciando Stress Test em ${BASE_URL}`);
  console.log(`👥 Usuários Simultâneos: ${CONCURRENCY}`);
  console.log(`⏱️  Duração: ${DURATION_SECONDS} segundos`);
  console.log('-----------------------------------');

  const workers = [];
  for (let i = 0; i < CONCURRENCY; i++) {
    workers.push(userScenario(i));
  }

  await Promise.all(workers);

  const duration = (Date.now() - stats.startTime) / 1000;
  const avgLatency = stats.latencies.reduce((a, b) => a + b, 0) / stats.latencies.length;
  const p95Latency = stats.latencies.sort((a, b) => a - b)[Math.floor(stats.latencies.length * 0.95)];
  const reqPerSec = stats.requests / duration;

  console.log('\n📊 Resultados do Teste:');
  console.log(`Total Requisições: ${stats.requests}`);
  console.log(`Duração Real: ${duration.toFixed(2)}s`);
  console.log(`RPS (Req/seg): ${reqPerSec.toFixed(2)}`);
  console.log(`Sucessos: ${stats.success} ✅`);
  console.log(`Falhas: ${stats.failures} ❌`);
  console.log(`Latência Média: ${avgLatency.toFixed(2)}ms`);
  console.log(`Latência P95: ${p95Latency}ms`);
  
  if (Object.keys(stats.errors).length > 0) {
    console.log('\n⚠️  Erros por Tipo:');
    console.table(stats.errors);
  }
}

runStressTest();
