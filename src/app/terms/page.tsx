import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 sm:p-12 rounded-2xl shadow-sm border border-gray-100">
        <Link href="/" className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium mb-8 transition-colors">
          <ChevronLeft className="w-5 h-5 mr-1" />
          Voltar para Home
        </Link>
        
        <h1 className="text-3xl font-bold font-heading mb-2 text-gray-900">Termos de Uso</h1>
        <p className="text-gray-500 mb-8">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>

        <div className="prose prose-green max-w-none text-gray-600 space-y-6">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Objeto</h2>
            <p>
              O presente termo regula o uso da plataforma MeuTime FC, destinada à gestão e divulgação de times de futebol amador.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Cadastro</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>O usuário declara que as informações fornecidas são verdadeiras.</li>
              <li>Cada conta é responsável pelos dados inseridos.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Planos e Pagamentos</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>O serviço pode ser gratuito ou pago.</li>
              <li>Planos pagos são cobrados mensal ou anualmente.</li>
              <li>O não pagamento pode resultar na suspensão de funcionalidades premium.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Responsabilidades do Usuário</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Não inserir conteúdo ofensivo ou ilegal.</li>
              <li>Respeitar direitos de imagem de atletas e patrocinadores.</li>
              <li>Utilizar a plataforma de forma ética.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Responsabilidades do MeuTime FC</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Manter a plataforma disponível e segura.</li>
              <li>Proteger os dados conforme a LGPD.</li>
              <li>Não se responsabilizar por informações inseridas pelos usuários.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Propriedade Intelectual</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>O sistema e sua marca pertencem ao MeuTime FC.</li>
              <li>O conteúdo dos times pertence aos respectivos usuários.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Cancelamento</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>O usuário pode cancelar a qualquer momento.</li>
              <li>Dados poderão ser removidos após o cancelamento.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">8. Alterações</h2>
            <p>
              O MeuTime FC pode atualizar estes termos mediante aviso prévio na plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">9. Foro</h2>
            <p>
              Fica eleito o foro da comarca do responsável legal pela plataforma.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
