"use client";

import Link from "next/link";
import { ArrowLeft, Copy, FileText, CheckCircle, LayoutTemplate, Briefcase, TrendingUp } from "lucide-react";
import { useState } from "react";
import { mockTeamData } from "@/data/mockTeam";

export default function SponsorResourcesPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'pdf' | 'doc' | 'flow' | 'contract' | 'institutional' | 'pitch'>('pdf');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const pdfContent = `PROPOSTA DE PATROCÍNIO
⚽ Futebol Amador • Comunidade • Visibilidade Real

[Logo do Time: ${mockTeamData.name}]
[Logo MeuTime FC]

📍 ${mockTeamData.city} | 📅 ${new Date().getFullYear()}

🟦 QUEM SOMOS
O MeuTime FC é uma plataforma digital que organiza e divulga times de futebol amador, conectando clubes, torcedores e marcas locais em um ambiente profissional e moderno.

Nosso objetivo é fortalecer o futebol de bairro e gerar visibilidade real para quem acredita no esporte.

🟨 POR QUE PATROCINAR NOSSO TIME?
✔ Público fiel e engajado
✔ Exposição contínua da marca
✔ Associação com esporte e comunidade
✔ Marketing local de alto impacto
✔ Custo acessível

Patrocinar futebol amador é investir onde as pessoas realmente se conectam.

🟧 ONDE SUA MARCA APARECE
📱 App oficial do time
🏟️ Página exclusiva do patrocinador
👕 Camisas oficiais
🏆 Campeonatos e títulos
📣 Comunicação com torcedores

🟥 PLANOS DE PATROCÍNIO

🥇 PATROCINADOR MASTER
- Destaque máximo no app
- Logo em todas as telas
- Destaque na Home
- Página exclusiva
💰 Valor: R$ ______ / mês

🥈 PATROCINADOR OFICIAL
- Logo na área de patrocinadores
- Página institucional
- Link direto para contato
💰 Valor: R$ ______ / mês

🥉 APOIADOR
- Logo no app
- Presença institucional
💰 Valor: R$ ______ / mês

🟩 FRASE DE IMPACTO
Quem apoia o futebol local, ganha o respeito da comunidade.

🟦 CONTATO
📞 WhatsApp: ${mockTeamData.whatsapp}
📧 E-mail: contato@meutimefc.com
📍 Cidade: ${mockTeamData.city}
`;

  const docContent = `Assunto: Proposta de Patrocínio – ${mockTeamData.name}

Olá, [Nome da Empresa],

Gostaríamos de apresentar uma oportunidade de parceria entre ${mockTeamData.name} e [Nome da Empresa], através da plataforma MeuTime FC.

Sua marca terá visibilidade direta para torcedores reais, dentro do app oficial do time, além de associação com esporte, comunidade e valores positivos.

Segue nossa proposta de patrocínio para avaliação.
Ficamos à disposição para ajustar o formato ideal para sua empresa.

Atenciosamente,
[Nome do Responsável]
📞 WhatsApp: ${mockTeamData.whatsapp}
📧 E-mail: contato@meutimefc.com
`;

  const salesFlowContent = `FLUXO DE VENDA PARA PATROCINADORES

🔹 ETAPA 1 – PROSPECÇÃO
- Comércio local
- Redes sociais
- Indicação de torcedores
- Parcerias locais

🔹 ETAPA 2 – ABORDAGEM
- Envio da proposta via WhatsApp/E-mail
- Foco em benefícios reais (não peça doação, ofereça parceria)
- Convite para café ou visita ao treino

🔹 ETAPA 3 – FECHAMENTO
- Definição da cota (Master, Ouro, Prata)
- Acordo de pagamento
- Assinatura do contrato (simples)

🔹 ETAPA 4 – PÓS-VENDA
- Envio de relatório mensal (prints do app)
- Convite para jogos importantes
- Agradecimento público nas redes
`;

  const institutionalContent = `PDF INSTITUCIONAL DO SaaS
  
CAPA
MeuTime FC
O SaaS que conecta futebol amador, torcedores e patrocinadores

O PROBLEMA
Times amadores não têm visibilidade, organização e monetização.

A SOLUÇÃO
Uma plataforma SaaS completa para:
- Gerenciar times
- Engajar torcedores
- Monetizar com patrocinadores

PARA QUEM É
- Times amadores
- Ligas e campeonatos
- Empresas locais

PRINCIPAIS FUNCIONALIDADES
✔ Gestão de jogadores
✔ Área de patrocinadores
✔ Loja de camisas
✔ Sócio torcedor
✔ Dashboard de métricas

MODELO SaaS
Planos mensais, escaláveis e acessíveis.

FRASE DE IMPACTO
Futebol de verdade merece tecnologia de verdade.

CTA FINAL
🚀 Comece agora
🌐 www.meutimefc.com
`;

  const pitchContent = `PITCH DE 30 SEGUNDOS (DECORA E VENDE)

“O MeuTime FC é um SaaS criado para profissionalizar o futebol amador.
Ajudamos times a se organizarem, engajarem torcedores e, principalmente, gerarem receita com patrocinadores locais.

Tudo em um único app: jogadores, campeonatos, camisas, sócio torcedor e métricas reais para patrocinadores.

Se você acredita no futebol de base e na força da comunidade, o MeuTime FC é a plataforma certa.”
`;

  const contractContent = `CONTRATO DE PATROCÍNIO

CONTRATANTE: ${mockTeamData.name}
PATROCINADOR: [Nome da Empresa]

1. OBJETO
Divulgação da marca do PATROCINADOR no aplicativo MeuTime FC e uniformes, conforme cota escolhida.

2. OBRIGAÇÕES DO TIME
- Exibir a marca conforme combinado.
- Manter o app atualizado.
- Zelar pela imagem do patrocinador.

3. OBRIGAÇÕES DO PATROCINADOR
- Fornecer logo em alta resolução.
- Realizar o pagamento na data acordada.

4. VALOR E PAGAMENTO
Valor: R$ [Valor]
Vencimento: Dia [Dia] de todo mês

5. PRAZO
Válido por [Meses] meses, renovável automaticamente.

Local e Data: ${mockTeamData.city}, ${new Date().toLocaleDateString()}

__________________________
${mockTeamData.name}

__________________________
[Nome da Empresa]
`;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link 
          href="/admin/sponsors"
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold font-heading text-gray-900">Materiais de Apoio</h1>
          <p className="text-gray-500">Modelos e documentos para ajudar na captação de patrocinadores</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('pdf')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
              activeTab === 'pdf'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <LayoutTemplate className="w-4 h-4" />
            PDF Diagramado
          </button>
          <button
            onClick={() => setActiveTab('doc')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
              activeTab === 'doc'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <FileText className="w-4 h-4" />
            Proposta Editável
          </button>
          <button
            onClick={() => setActiveTab('flow')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
              activeTab === 'flow'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            Fluxo de Venda
          </button>
          <button
            onClick={() => setActiveTab('contract')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
              activeTab === 'contract'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            Contrato
          </button>
          <button
            onClick={() => setActiveTab('institutional')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
              activeTab === 'institutional'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            Institucional SaaS
          </button>
           <button
            onClick={() => setActiveTab('pitch')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
              activeTab === 'pitch'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            Pitch (30s)
          </button>
        </nav>
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              {activeTab === 'pdf' && 'Texto para PDF Diagramado'}
              {activeTab === 'doc' && 'Modelo de E-mail / WhatsApp'}
              {activeTab === 'flow' && 'Guia de Prospecção'}
              {activeTab === 'contract' && 'Minuta de Contrato Simples'}
              {activeTab === 'institutional' && 'Conteúdo Institucional (SaaS)'}
              {activeTab === 'pitch' && 'Script de Vendas (30s)'}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {activeTab === 'pdf' && 'Copie este conteúdo e cole no Canva ou Figma para criar sua apresentação.'}
              {activeTab === 'doc' && 'Personalize os campos entre colchetes [ ] antes de enviar.'}
              {activeTab === 'flow' && 'Siga este passo a passo para aumentar suas chances de fechamento.'}
              {activeTab === 'contract' && 'Documento jurídico simplificado para formalizar a parceria.'}
              {activeTab === 'institutional' && 'Texto para apresentação institucional do software.'}
              {activeTab === 'pitch' && 'Decore este texto para vender o projeto rapidamente.'}
            </p>
          </div>
          <button 
            onClick={() => copyToClipboard(
              activeTab === 'pdf' ? pdfContent : 
              activeTab === 'doc' ? docContent : 
              activeTab === 'flow' ? salesFlowContent : 
              activeTab === 'contract' ? contractContent :
              activeTab === 'institutional' ? institutionalContent :
              pitchContent,
              activeTab
            )}
            className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium px-4 py-2 bg-white rounded-lg border border-primary-200 shadow-sm hover:shadow transition-all"
          >
            {copied === activeTab ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied === activeTab ? 'Copiado!' : 'Copiar Texto'}
          </button>
        </div>
        <div className="p-6">
          <pre className="whitespace-pre-wrap font-sans text-gray-600 text-sm leading-relaxed max-h-[600px] overflow-y-auto">
            {activeTab === 'pdf' && pdfContent}
            {activeTab === 'doc' && docContent}
            {activeTab === 'flow' && salesFlowContent}
            {activeTab === 'contract' && contractContent}
            {activeTab === 'institutional' && institutionalContent}
            {activeTab === 'pitch' && pitchContent}
          </pre>
        </div>
      </div>
    </div>
  );
}
