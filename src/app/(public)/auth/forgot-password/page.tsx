'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, ShieldCheck, ArrowRight, Loader2, Phone, MessageCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [channel, setChannel] = useState<'email' | 'whatsapp'>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [devLink, setDevLink] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');
    setError('');
    setDevLink(null);

    try {
      const payload =
        channel === 'email'
          ? { email, channel: 'email' as const }
          : { phone, channel: 'whatsapp' as const };

      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Não foi possível processar a solicitação.');
        return;
      }

      setMessage(
        data.message ||
          (channel === 'email'
            ? 'Se este email estiver cadastrado, enviaremos um link para redefinir sua senha.'
            : 'Se este telefone estiver cadastrado, enviaremos instruções pelo WhatsApp.')
      );

      if (data.dev_reset_link) {
        setDevLink(data.dev_reset_link);
      }
    } catch (err) {
      setError('Erro ao conectar com o servidor. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-black flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-8">
        <div className="mx-auto w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-xl border border-white/20 mb-6">
          <ShieldCheck className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold font-heading text-white tracking-tight">
          Recuperar Acesso
        </h2>
        <p className="mt-2 text-sm text-gray-300">
          Escolha como prefere receber as instruções de redefinição de senha com segurança.
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 shadow-2xl sm:rounded-2xl border border-gray-100">
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-start gap-2">
              <ShieldCheck className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {message && (
            <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm flex items-start gap-2">
              <ShieldCheck className="w-5 h-5 flex-shrink-0" />
              <span>{message}</span>
            </div>
          )}

          {devLink && (
            <div className="mb-6 bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-xl text-xs break-all">
              <p className="font-bold mb-1">[Ambiente de Desenvolvimento]</p>
              Link gerado: <Link href={devLink} className="underline text-yellow-900">{devLink}</Link>
            </div>
          )}

          <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
            <button
              type="button"
              onClick={() => setChannel('email')}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
                channel === 'email'
                  ? 'bg-white shadow text-primary-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Email
            </button>
            <button
              type="button"
              onClick={() => setChannel('whatsapp')}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
                channel === 'whatsapp'
                  ? 'bg-white shadow text-primary-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              WhatsApp
            </button>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {channel === 'email' ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white transition-all sm:text-sm"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Telefone com WhatsApp
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white transition-all sm:text-sm"
                    placeholder="(11) 99999-9999"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500 flex items-center gap-1.5">
                  <MessageCircle className="w-3.5 h-3.5 text-primary-500" />
                  Vamos enviar instruções pelo WhatsApp se o número estiver cadastrado.
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {channel === 'email'
                    ? 'Enviar link de recuperação'
                    : 'Enviar instruções pelo WhatsApp'}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            Lembrou a senha?{' '}
            <Link href="/auth/login" className="font-medium text-primary-600 hover:text-primary-500">
              Voltar para o login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
