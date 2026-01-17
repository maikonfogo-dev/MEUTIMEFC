import Link from "next/link";
import { Check, Shield, Trophy, Users, Smartphone, BarChart3, Menu, X, ArrowRight, Star, Heart, DollarSign } from "lucide-react";
import { SAAS_PLANS } from "@/data/pricing";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 scroll-smooth">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold font-heading text-primary-600">MeuTime FC</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#problema" className="text-gray-600 hover:text-primary-600 transition-colors">Sobre</a>
              <a href="#solucao" className="text-gray-600 hover:text-primary-600 transition-colors">Solução</a>
              <a href="#beneficios" className="text-gray-600 hover:text-primary-600 transition-colors">Benefícios</a>
              <Link href="/leagues" className="text-gray-600 hover:text-primary-600 transition-colors font-medium text-green-700">Ligas</Link>
              <a href="#planos" className="text-gray-600 hover:text-primary-600 transition-colors">Planos</a>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/auth/login"
                className="px-4 h-10 inline-flex items-center justify-center rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:text-primary-700 hover:border-primary-200 hover:bg-primary-50/60 transition-colors"
              >
                Entrar
              </Link>
              <Link
                href="/auth/register"
                className="bg-secondary text-primary-900 px-5 h-12 rounded-lg font-bold hover:bg-secondary-600 hover:text-white transition-colors shadow-lg shadow-secondary-500/30"
              >
                Criar Time
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-sm font-medium mb-8 border border-primary-100">
            <span className="flex h-2 w-2 rounded-full bg-primary-600 mr-2 animate-pulse"></span>
            Plataforma nº 1 do Futebol Amador
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-heading tracking-tight mb-6 text-gray-900 leading-tight">
            Transforme seu time amador <br className="hidden md:block" />
            em um <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">clube organizado</span>
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            O MeuTime FC é uma plataforma SaaS que cria um app completo e um painel gerenciador para times de futebol amador.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/auth/register"
              className="px-8 h-12 bg-secondary text-primary-900 rounded-lg font-bold text-lg hover:bg-secondary-600 hover:text-white transition-all shadow-xl hover:shadow-secondary-500/30 transform hover:-translate-y-1 flex items-center justify-center"
            >
              👉 Criar meu time grátis
            </Link>
            <Link
              href="/team/real-madruga"
              className="px-8 h-12 bg-white text-gray-700 border border-gray-200 rounded-lg font-bold text-lg hover:bg-gray-50 transition-all transform hover:-translate-y-1 flex items-center justify-center"
            >
              👉 Ver como funciona
            </Link>
          </div>
        </div>
        
        {/* Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-400/10 rounded-full blur-3xl -z-10"></div>
      </section>

      {/* The Problem Section */}
      <section id="problema" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-gray-900">
              Times amadores têm talento, história e torcida...
            </h2>
            <p className="text-xl text-red-500 font-medium">
              mas sofrem com:
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { title: "Falta de Organização", icon: X, desc: "Dados perdidos em cadernos ou planilhas." },
              { title: "Pouca Visibilidade", icon: X, desc: "Ninguém conhece a história do time." },
              { title: "Sem Patrocinadores", icon: X, desc: "Dificuldade para atrair investimento." },
              { title: "Caos no WhatsApp", icon: X, desc: "Informações espalhadas em grupos." }
            ].map((item, i) => (
              <div key={i} className="bg-red-50 p-6 rounded-2xl border border-red-100 text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 mx-auto mb-4">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Solution Section */}
      <section id="solucao" className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary-600 font-bold tracking-wider uppercase text-sm">A Solução</span>
            <h2 className="text-3xl md:text-4xl font-bold font-heading mt-2 mb-6 text-gray-900">
              O MeuTime FC centraliza tudo em um único sistema
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {[
                { label: "App público do time", icon: Smartphone },
                { label: "Painel gerenciador", icon: BarChart3 },
                { label: "Jogadores, campeonatos e títulos", icon: Trophy },
                { label: "Patrocinadores e sócio torcedor", icon: DollarSign },
                { label: "Tudo simples e acessível", icon: Check }
              ].map((item, i) => (
                <div key={i} className="flex items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-primary-200 transition-colors">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mr-4">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-gray-800 text-lg">{item.label}</span>
                </div>
              ))}
            </div>
            
            {/* Abstract Visual Representation of the System */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-500 to-green-400 rounded-3xl opacity-20 blur-xl"></div>
              <div className="relative bg-white p-8 rounded-3xl shadow-2xl border border-gray-100">
                <div className="flex flex-col gap-4">
                  <div className="h-8 w-1/3 bg-gray-100 rounded animate-pulse"></div>
                  <div className="flex gap-4">
                    <div className="flex-1 h-32 bg-primary-50 rounded-xl border border-primary-100 p-4 flex flex-col justify-between">
                       <div className="w-8 h-8 bg-primary-200 rounded-full"></div>
                       <div className="h-2 w-1/2 bg-primary-200 rounded"></div>
                    </div>
                    <div className="flex-1 h-32 bg-gray-50 rounded-xl border border-gray-100 p-4 flex flex-col justify-between">
                       <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                       <div className="h-2 w-1/2 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                  <div className="h-4 w-full bg-gray-100 rounded mt-4"></div>
                  <div className="h-4 w-5/6 bg-gray-100 rounded"></div>
                  <div className="h-4 w-4/6 bg-gray-100 rounded"></div>
                </div>
                <div className="mt-8 text-center text-sm text-gray-500 font-medium">
                  Painel Admin + App do Torcedor
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="beneficios" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-gray-900">
               O que seu time ganha?
             </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1: Time */}
            <div className="p-8 rounded-xl bg-green-50 border border-green-100 hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="w-14 h-14 bg-green-500 rounded-lg flex items-center justify-center text-white mb-6 shadow-lg shadow-green-500/30">
                <Shield className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Para o Time</h3>
              <ul className="space-y-3">
                {["Organização profissional", "Valorização dos atletas", "Histórico registrado", "Mais credibilidade"].map((item, i) => (
                  <li key={i} className="flex items-center text-gray-700 font-medium">
                    <Check className="w-5 h-5 text-green-600 mr-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Card 2: Torcida */}
            <div className="p-8 rounded-xl bg-blue-50 border border-blue-100 hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="w-14 h-14 bg-blue-500 rounded-lg flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-500/30">
                <Heart className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Para a Torcida</h3>
              <ul className="space-y-3">
                {["Informações atualizadas", "Engajamento com o clube", "Facilidade para apoiar", "Acesso rápido"].map((item, i) => (
                  <li key={i} className="flex items-center text-gray-700 font-medium">
                    <Check className="w-5 h-5 text-blue-600 mr-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Card 3: Patrocinadores */}
            <div className="p-8 rounded-xl bg-purple-50 border border-purple-100 hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="w-14 h-14 bg-purple-500 rounded-lg flex items-center justify-center text-white mb-6 shadow-lg shadow-purple-500/30">
                <DollarSign className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Para Patrocinadores</h3>
              <ul className="space-y-3">
                {["Visibilidade local", "Público engajado", "Presença digital contínua", "Retorno garantido"].map((item, i) => (
                  <li key={i} className="flex items-center text-gray-700 font-medium">
                    <Check className="w-5 h-5 text-purple-600 mr-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features List Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading">Funcionalidades Poderosas</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              "Elenco de jogadores", "Campeonatos disputados", "Títulos conquistados", "Camisas oficiais",
              "Patrocinadores", "Sócio torcedor", "Notificações", "Painel administrativo"
            ].map((feature, i) => (
              <div key={i} className="p-4 rounded-xl bg-gray-800 border border-gray-700 hover:bg-gray-750 transition-colors">
                <div className="w-2 h-2 bg-primary-500 rounded-full mx-auto mb-3"></div>
                <span className="font-medium text-gray-200">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="planos" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-gray-900">Planos</h2>
            <p className="text-xl text-gray-600">
              👉 Comece grátis e evolua conforme seu time cresce.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SAAS_PLANS.map((plan) => (
              <div key={plan.id} className={`relative flex flex-col p-6 rounded-xl border ${plan.recommended ? 'border-secondary ring-2 ring-secondary ring-opacity-50' : 'border-gray-200'} bg-white shadow-sm hover:shadow-md transition-shadow`}>
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-secondary text-white px-4 py-1 rounded-full text-sm font-bold">
                    Mais Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
                  <p className="text-sm text-gray-500 mt-2 min-h-[40px]">{plan.description}</p>
                </div>
                <div className="mb-6">
                  {plan.price.monthly === 0 && plan.name !== 'Liga / Premium' ? (
                     <span className="text-4xl font-bold text-gray-900">Grátis</span>
                  ) : plan.price.monthly === 0 ? (
                    <span className="text-3xl font-bold text-gray-900">Sob Consulta</span>
                  ) : (
                    <>
                      <span className="text-4xl font-bold text-gray-900">R$ {plan.price.monthly.toFixed(2).replace('.', ',')}</span>
                      <span className="text-gray-500">/mês</span>
                      <div className="text-xs text-gray-500 mt-1">ou R$ {plan.price.yearly.toFixed(2).replace('.', ',')} /ano</div>
                    </>
                  )}
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-sm text-gray-600">
                      <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={
                    plan.id === "league"
                      ? "/leagues"
                      : `/auth/register?plan=${plan.id}`
                  }
                  className={`w-full h-12 rounded-lg font-bold transition-colors flex items-center justify-center ${
                    plan.recommended
                      ? "bg-secondary text-white hover:bg-secondary-600"
                      : "bg-gray-50 text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-primary-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="mb-8">
            <div className="flex justify-center gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
            </div>
            <blockquote className="text-2xl md:text-3xl font-medium text-gray-900 italic leading-relaxed">
              “Hoje nosso time é visto como clube de verdade. O MeuTime FC mudou nossa organização.”
            </blockquote>
            <div className="mt-6">
              <cite className="font-bold text-gray-900 not-italic block">— Capitão do Time</cite>
              <span className="text-primary-600 text-sm font-medium">Usuário do MeuTime FC</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 bg-primary-900 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-10">
           <div className="absolute w-[600px] h-[600px] bg-white rounded-full blur-3xl -top-32 -left-32"></div>
           <div className="absolute w-[600px] h-[600px] bg-white rounded-full blur-3xl bottom-0 right-0"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-8">
            ⚽ Seu time já joga sério.<br />
            Agora organize como profissional.
          </h2>
          <Link
            href="/auth/register"
            className="inline-flex items-center justify-center px-12 py-5 bg-white text-primary-900 rounded-xl font-bold text-xl hover:bg-primary-50 transition-all shadow-2xl hover:scale-105 transform"
          >
            👉 Criar meu time agora
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <span className="text-2xl font-bold font-heading text-primary-600 mb-4 block">MeuTime FC</span>
              <p className="text-gray-500 max-w-xs mb-6">
                A plataforma completa para gestão e divulgação de times de futebol amador.
              </p>
              <div className="flex space-x-4">
                {/* Social Icons Placeholders */}
                <div className="w-8 h-8 bg-gray-100 rounded-full hover:bg-primary-100 transition-colors cursor-pointer"></div>
                <div className="w-8 h-8 bg-gray-100 rounded-full hover:bg-primary-100 transition-colors cursor-pointer"></div>
                <div className="w-8 h-8 bg-gray-100 rounded-full hover:bg-primary-100 transition-colors cursor-pointer"></div>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Produto</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#beneficios" className="hover:text-primary-600">Benefícios</a></li>
                <li><a href="#planos" className="hover:text-primary-600">Planos</a></li>
                <li><Link href="/team/real-madruga" className="hover:text-primary-600">Exemplo</Link></li>
                <li><Link href="/leagues" className="hover:text-primary-600 font-bold text-primary-600">Para Ligas</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="/terms" className="hover:text-primary-600">
                    Termos de Uso
                  </Link>
                </li>
                <li>
                  <Link href="/legal/privacy" className="hover:text-primary-600">
                    Privacidade
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-600">
                    Contato
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-12 pt-8 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} MeuTime FC. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
