'use client';

import { ShieldCheck, Lock, Eye, FileText, Database, Server } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Header */}
        <div className="bg-primary-900 px-8 py-10 text-white">
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="w-8 h-8 text-secondary-500" />
            <h1 className="text-3xl font-bold font-heading">Política de Privacidade</h1>
          </div>
          <p className="text-primary-100 text-lg">
            Sua privacidade é nossa prioridade. Conheça como tratamos seus dados no MeuTime FC.
          </p>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8 text-gray-700">
          
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="bg-primary-100 text-primary-800 w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
              Coleta de Dados
            </h2>
            <p className="mb-3">Coletamos dados pessoais como nome, e-mail, telefone, CPF e endereço para:</p>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li>Cadastro no sistema e criação de perfil de torcedor/sócio.</li>
              <li>Processamento de compras na loja oficial.</li>
              <li>Gestão de pagamentos e logística de entregas.</li>
              <li>Comunicação direta com usuários (notificações, suporte).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="bg-primary-100 text-primary-800 w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
              Uso dos Dados
            </h2>
            <p className="mb-3">Os dados são utilizados exclusivamente para:</p>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li>Execução dos serviços contratados (SaaS).</li>
              <li>Identificação e autenticação do usuário.</li>
              <li>Cumprimento de obrigações legais e fiscais.</li>
              <li>Melhoria contínua da experiência no aplicativo.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="bg-primary-100 text-primary-800 w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
              Compartilhamento
            </h2>
            <p className="mb-3">Os dados poderão ser compartilhados apenas com:</p>
            <div className="grid sm:grid-cols-2 gap-4 mt-2">
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 flex items-center gap-2">
                <Lock className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium">Processadores de Pagamento</span>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 flex items-center gap-2">
                <Server className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium">Serviços de Entrega</span>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 flex items-center gap-2">
                <Database className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium">Plataformas de Autenticação</span>
              </div>
            </div>
            <p className="mt-4 font-bold text-primary-700">Nunca vendemos dados pessoais.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="bg-primary-100 text-primary-800 w-8 h-8 rounded-full flex items-center justify-center text-sm">4</span>
              Armazenamento e Segurança
            </h2>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li>Dados sensíveis criptografados em repouso e em trânsito.</li>
              <li>Acesso restrito rigorosamente por permissão (RBAC).</li>
              <li>Monitoramento contínuo de segurança e logs de acesso.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="bg-primary-100 text-primary-800 w-8 h-8 rounded-full flex items-center justify-center text-sm">5</span>
              Direitos do Titular
            </h2>
            <p className="mb-3">O usuário pode a qualquer momento:</p>
            <ul className="list-disc pl-5 space-y-1 text-gray-600 mb-4">
              <li>Solicitar acesso aos dados armazenados.</li>
              <li>Corrigir informações incompletas ou inexatas.</li>
              <li>Solicitar a exclusão de dados (quando aplicável).</li>
              <li>Revogar consentimento de uso.</li>
            </ul>
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
              <p className="text-sm text-blue-800">
                <strong>Solicitações via E-mail:</strong> <br />
                <a href="mailto:contato@meutimefc.com" className="underline">contato@meutimefc.com</a>
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="bg-primary-100 text-primary-800 w-8 h-8 rounded-full flex items-center justify-center text-sm">6</span>
              Retenção e Alterações
            </h2>
            <p className="text-gray-600 mb-2">
              Os dados são mantidos apenas pelo tempo necessário para cumprir as finalidades legais e contratuais.
            </p>
            <p className="text-gray-600">
              Esta política pode ser atualizada a qualquer momento, com aviso prévio no aplicativo ou via e-mail.
            </p>
          </section>

        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-6 border-t border-gray-100 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} MeuTime FC - Todos os direitos reservados.
        </div>
      </div>
    </div>
  );
}
