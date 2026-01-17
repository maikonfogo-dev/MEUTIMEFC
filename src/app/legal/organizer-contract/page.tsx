"use client";

import Link from "next/link";
import { ArrowLeft, Printer, Download } from "lucide-react";

export default function OrganizerContractPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 print:bg-white print:p-0">
      <div className="max-w-4xl mx-auto">
        {/* Header - No Print */}
        <div className="flex justify-between items-center mb-8 print:hidden">
          <Link href="/leagues" className="flex items-center text-gray-600 hover:text-primary-600 font-medium transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para Ligas
          </Link>
          <div className="flex gap-2">
            <button 
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
            >
              <Printer className="w-4 h-4" />
              Imprimir
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors shadow-sm">
              <Download className="w-4 h-4" />
              Baixar PDF
            </button>
          </div>
        </div>

        {/* Contract Content */}
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-200 print:shadow-none print:border-none print:p-0">
          <div className="text-center mb-12 border-b border-gray-100 pb-8">
            <h1 className="text-2xl md:text-3xl font-bold font-heading text-gray-900 uppercase mb-2">
              Contrato de Uso da Plataforma
            </h1>
            <p className="text-gray-500 font-medium">MeuTime FC - Gestão de Campeonatos</p>
          </div>

          <div className="prose prose-gray max-w-none space-y-8 text-justify text-gray-700">
            
            <p className="text-gray-600 mb-6">
              Este CONTRATO DE PARCERIA COMERCIAL E PRESTAÇÃO DE SERVIÇOS (o &quot;Contrato&quot;) é celebrado entre a MEUTIME FC TECNOLOGIA LTDA (&quot;Plataforma&quot;) e o ORGANIZADOR DE EVENTOS ESPORTIVOS identificado no cadastro (&quot;Organizador&quot;).
            </p>

            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-3">1. Objeto</h2>
                <p className="text-gray-600 leading-relaxed">
                  1.1. O presente instrumento tem como objeto o fornecimento, pela Plataforma ao Organizador, de licença de uso do software &quot;MeuTime FC Ligas&quot; para gestão de campeonatos, bem como a prestação de serviços de intermediação de pagamentos e inscrições.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-3">2. Obrigações do Organizador</h2>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>Fornecer informações verídicas sobre os campeonatos e eventos.</li>
                  <li>Responsabilizar-se integralmente pela realização dos jogos, arbitragem e premiação.</li>
                  <li>Manter a Plataforma isenta de responsabilidade sobre cancelamentos ou disputas desportivas.</li>
                  <li>Utilizar a marca &quot;MeuTime FC&quot; apenas conforme diretrizes de brandbook fornecidas.</li>
                </ul>
              </section>
            </div>

            <section>
              <h3 className="text-lg font-bold text-gray-900 uppercase mb-4 border-l-4 border-primary-500 pl-3">Cláusula 3 – Transmissões</h3>
              <p>
                A plataforma fornece a infraestrutura tecnológica para transmissão (player, chat, integração).
                O organizador é inteiramente responsável por:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>Direitos de imagem e voz de narradores, comentaristas e atletas.</li>
                <li>Autorização dos atletas e times para exibição pública.</li>
                <li>Conteúdo exibido durante a transmissão, incluindo publicidade local.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-900 uppercase mb-4 border-l-4 border-primary-500 pl-3">Cláusula 4 – Monetização</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>A receita gerada através de ferramentas da plataforma (ex: Pay-per-view) poderá ser compartilhada conforme as taxas definidas no plano contratado.</li>
                <li>O MeuTime FC reserva-se o direito de exibir patrocinadores institucionais próprios na interface da plataforma, salvo em planos &quot;White Label&quot; ou &quot;Monetização Exclusiva&quot; se previstos.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-900 uppercase mb-4 border-l-4 border-primary-500 pl-3">Cláusula 5 – Pagamento</h3>
              <p>
                O uso dos recursos Premium é condicionado ao pagamento mensal recorrente conforme tabela vigente.
                O cancelamento pode ser solicitado a qualquer momento, mediante aviso prévio de 30 dias para encerramento das cobranças futuras.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-900 uppercase mb-4 border-l-4 border-primary-500 pl-3">Cláusula 6 – Prazo</h3>
              <p>
                Este contrato vige por prazo indeterminado, com início na data da contratação eletrônica ou cadastro na plataforma.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-900 uppercase mb-4 border-l-4 border-primary-500 pl-3">Cláusula 7 – Rescisão</h3>
              <p>
                O contrato poderá ser rescindido por qualquer uma das partes, respeitando o prazo de aviso prévio. O MeuTime FC poderá rescindir imediatamente em caso de violação dos termos de uso ou legislação vigente.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-900 uppercase mb-4 border-l-4 border-primary-500 pl-3">Cláusula 8 – Foro</h3>
              <p>
                Fica eleito o foro da comarca do contratante para dirimir quaisquer dúvidas oriundas deste contrato.
              </p>
            </section>

            <div className="mt-16 pt-8 border-t border-gray-200 grid grid-cols-2 gap-12">
              <div>
                <div className="h-px bg-black mb-4"></div>
                <p className="font-bold text-sm uppercase">Organizador</p>
                <p className="text-xs text-gray-500">Assinatura</p>
              </div>
              <div>
                <div className="h-px bg-black mb-4"></div>
                <p className="font-bold text-sm uppercase">MeuTime FC</p>
                <p className="text-xs text-gray-500">Plataforma</p>
              </div>
            </div>

            <div className="text-center text-sm text-gray-400 mt-12">
              Data de Emissão: {new Date().toLocaleDateString('pt-BR')}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
