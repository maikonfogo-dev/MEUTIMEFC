import Link from "next/link";
import { Check, Video, Trophy, Users, BarChart2, PlayCircle, DollarSign, Calendar, Shield, ArrowRight } from "lucide-react";

export default function LeaguesLandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 scroll-smooth">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Link href="/" className="text-2xl font-bold font-heading text-primary-600">MeuTime FC</Link>
              <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-bold rounded-full uppercase tracking-wider">Ligas</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#problema" className="text-gray-600 hover:text-primary-600 transition-colors">Problemas</a>
              <a href="#solucao" className="text-gray-600 hover:text-primary-600 transition-colors">Solução</a>
              <a href="#transmissao" className="text-gray-600 hover:text-primary-600 transition-colors">Transmissão</a>
              <a href="#planos" className="text-gray-600 hover:text-primary-600 transition-colors">Planos</a>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/admin/login" className="text-gray-600 hover:text-primary-600 font-medium">
                Entrar
              </Link>
              <Link
                href="/admin/register?type=league"
                className="bg-primary-600 text-white px-5 h-10 rounded-lg font-bold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/20 text-sm flex items-center justify-center"
              >
                Criar Campeonato
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden relative bg-gray-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2093&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 text-white">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-500/20 text-primary-300 text-sm font-medium mb-8 border border-primary-500/30">
            <span className="flex h-2 w-2 rounded-full bg-primary-500 mr-2 animate-pulse"></span>
            O SaaS que profissionaliza ligas de futebol amador
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-heading tracking-tight mb-6 leading-tight">
            Organize, transmita e <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">monetize seu campeonato</span>
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            Crie campeonatos, gerencie jogos, transmita partidas ao vivo e gere receita com patrocinadores — tudo em uma única plataforma.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/admin/register?type=league"
              className="px-8 h-14 bg-primary-600 text-white rounded-xl font-bold text-lg hover:bg-primary-500 transition-all shadow-xl hover:shadow-primary-500/30 transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              👉 Criar Campeonato Agora
            </Link>
            <Link
              href="/team/real-madruga/championships"
              className="px-8 h-14 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-xl font-bold text-lg hover:bg-white/20 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              <PlayCircle className="w-5 h-5" />
              Ver demonstração
            </Link>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problema" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-gray-900">
              Organizar campeonatos dá trabalho
            </h2>
            <p className="text-xl text-gray-500 font-medium">
              O futebol amador cresce, mas a gestão ficou para trás.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { title: "Planilhas Confusas", icon: Calendar, desc: "Tabelas manuais e erros constantes." },
              { title: "Falta de Visibilidade", icon: Shield, desc: "Ninguém sabe onde assistir ou ver resultados." },
              { title: "Nenhuma Monetização", icon: DollarSign, desc: "Campeonato não se paga e depende só de inscrição." },
              { title: "Zero Dados", icon: BarChart2, desc: "Sem estatísticas, artilharia ou histórico confiável." }
            ].map((item, i) => (
              <div key={i} className="bg-gray-50 p-8 rounded-2xl border border-gray-100 text-center hover:shadow-lg transition-shadow group">
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-red-500 mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-xl text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solucao" className="py-24 bg-gray-900 text-white relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-600/20 rounded-full blur-[100px] -z-10"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary-600/20 rounded-full blur-[100px] -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-primary-400 font-bold tracking-wider uppercase text-sm mb-2 block">A Solução Completa</span>
              <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6 leading-tight">
                Com o MeuTime FC, <br />
                <span className="text-primary-400">sua liga tem tudo.</span>
              </h2>
              <ul className="space-y-6 mt-8">
                {[
                  "Criação automática de campeonatos e tabelas",
                  "Estatísticas em tempo real (Gols, Cartões, Artilharia)",
                  "Transmissão ao vivo integrada (YouTube/RTMP)",
                  "Monetização com patrocinadores e banners",
                  "Engajamento dos torcedores via App"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-lg text-gray-300">
                    <div className="w-6 h-6 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-400 flex-shrink-0">
                      <Check className="w-4 h-4" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <Link
                  href="/admin/register?type=league"
                  className="bg-white text-gray-900 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
                >
                  Começar agora
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
            <div className="relative">
              {/* Mockup Placeholder */}
              <div className="relative bg-gray-800 rounded-2xl p-4 shadow-2xl border border-gray-700 aspect-square flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent"></div>
                {/* Simulated Interface */}
                <div className="w-full max-w-sm bg-white rounded-xl shadow-lg overflow-hidden transform rotate-[-3deg] hover:rotate-0 transition-transform duration-500">
                  <div className="bg-primary-600 p-4 text-white flex justify-between items-center">
                    <span className="font-bold">Copa do Bairro</span>
                    <span className="text-xs bg-white/20 px-2 py-1 rounded">AO VIVO</span>
                  </div>
                  <div className="p-4 bg-gray-900 aspect-video flex items-center justify-center relative">
                    <PlayCircle className="w-12 h-12 text-white opacity-80" />
                    <div className="absolute bottom-2 left-2 bg-black/50 px-2 py-1 rounded text-white text-xs">
                      1.2k assistindo
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    <div className="flex justify-between items-center font-bold text-gray-800">
                      <span>Real Madruga</span>
                      <span className="text-2xl">2 x 1</span>
                      <span>Unidos da Vila</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Streaming Feature */}
      <section id="transmissao" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider">Ao Vivo</span>
            <h2 className="text-3xl md:text-4xl font-bold font-heading mt-4 mb-4 text-gray-900">
              Leve seus jogos para o digital
            </h2>
            <p className="text-xl text-gray-500">Seu campeonato visto, comentado e valorizado.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
              <Video className="w-10 h-10 text-primary-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Player Integrado</h3>
              <p className="text-gray-600">Transmita direto do YouTube ou RTMP próprio dentro do app do campeonato.</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
              <Users className="w-10 h-10 text-primary-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Engajamento Real</h3>
              <p className="text-gray-600">Chat ao vivo, reações e contador de espectadores em tempo real.</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
              <DollarSign className="w-10 h-10 text-primary-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Monetização</h3>
              <p className="text-gray-600">Venda cotas de patrocínio, insira banners na live e cobre Pay-per-view.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="planos" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-gray-900">
              Planos para todos os tamanhos
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Pro Liga */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 flex flex-col">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Pro Liga</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-sm text-gray-500">R$</span>
                <span className="text-4xl font-bold text-gray-900">149</span>
                <span className="text-gray-500">/mês</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {['Criar campeonatos ilimitados', 'Tabelas automáticas', 'Estatísticas de jogos', 'Gestão de times', 'Sem transmissão'].map((feat, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
                    <Check className="w-4 h-4 text-green-500" /> {feat}
                  </li>
                ))}
              </ul>
              <Link
                href="/admin/register?type=league&plan=pro-liga"
                className="w-full py-3 px-4 bg-gray-100 text-gray-900 font-bold rounded-xl hover:bg-gray-200 transition-colors text-center"
              >
                Escolher Plano
              </Link>
            </div>

            {/* Transmissão */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-primary-500 relative flex flex-col transform scale-105 z-10">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                Recomendado
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Transmissão</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-sm text-gray-500">R$</span>
                <span className="text-4xl font-bold text-gray-900">299</span>
                <span className="text-gray-500">/mês</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {['Tudo do Pro Liga', 'Transmissão ao vivo (RTMP/YouTube)', 'Player integrado no App', 'Chat ao vivo', 'Métricas de audiência'].map((feat, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
                    <Check className="w-4 h-4 text-green-500" /> {feat}
                  </li>
                ))}
              </ul>
              <Link
                href="/admin/register?type=league&plan=transmission"
                className="w-full py-3 px-4 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/20 text-center"
              >
                Começar Agora
              </Link>
            </div>

            {/* Monetização */}
            <div className="bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-800 text-white flex flex-col">
              <h3 className="text-xl font-bold text-white mb-2">Monetização</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-sm text-gray-400">R$</span>
                <span className="text-4xl font-bold text-white">499</span>
                <span className="text-gray-400">/mês</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {['Tudo do Plano Transmissão', 'Área de Patrocinadores', 'Inserção de Banners na Live', 'Relatórios Financeiros', 'Vídeo Pré-Jogo (Vinheta)'].map((feat, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                    <Check className="w-4 h-4 text-primary-400" /> {feat}
                  </li>
                ))}
              </ul>
              <Link
                href="/admin/register?type=league&plan=monetization"
                className="w-full py-3 px-4 bg-white text-gray-900 font-bold rounded-xl hover:bg-gray-100 transition-colors text-center"
              >
                Falar com Consultor
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-primary-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522770179533-24471fcdba45?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 text-white">
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">
            Transforme seu campeonato em um <br /> produto profissional.
          </h2>
          <p className="text-xl text-primary-100 mb-10">
            Comece hoje mesmo a organizar, transmitir e lucrar com sua liga.
          </p>
          <Link
            href="/admin/register?type=league"
            className="inline-flex items-center justify-center px-10 h-16 bg-white text-primary-900 rounded-xl font-bold text-xl hover:bg-gray-50 transition-all shadow-xl transform hover:-translate-y-1"
          >
            🚀 Começar hoje mesmo
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <span className="text-2xl font-bold font-heading text-white">MeuTime FC</span>
            <p className="mt-2 text-sm">O parceiro oficial do futebol amador.</p>
          </div>
          <div className="flex gap-8 text-sm">
            <Link href="/legal/organizer-contract" className="hover:text-white transition-colors">
              Contrato do Organizador
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Termos de Uso
            </Link>
            <Link href="/legal/privacy" className="hover:text-white transition-colors">
              Privacidade
            </Link>
          </div>
          <div className="text-sm">
            © 2026 MeuTime FC. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
