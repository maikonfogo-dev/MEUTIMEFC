'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { Mail, ShieldCheck, Zap, Phone, Lock, ArrowRight, Eye, EyeOff, MessageCircle, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const { login, requestOtp, verifyOtp } = useAuth();
  
  // States for flow control
  const [authMethod, setAuthMethod] = useState<'email' | 'whatsapp'>('email');
  const [whatsappStep, setWhatsappStep] = useState<'phone' | 'otp'>('phone');
  
  // Input states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [showPassword, setShowPassword] = useState(false);
  
  // Feedback states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [devCode, setDevCode] = useState<string | undefined>(undefined);
  const [timer, setTimer] = useState(30);

  // Timer logic for OTP
  useEffect(() => {
    if (authMethod === 'whatsapp' && whatsappStep === 'otp' && timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [authMethod, whatsappStep, timer]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login(email, password);
      window.location.href = '/team/real-madruga/store';
    } catch (err: any) {
      setError(err.message || 'Credenciais inválidas');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const code = await requestOtp(phone);
      setDevCode(code); // Show in UI for dev
      setWhatsappStep('otp');
      setTimer(30);
    } catch (err: any) {
      setError(err.message || 'Erro ao enviar código');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const code = otp.join('');
      if (code.length !== 6) throw new Error('Código incompleto');
      
      await verifyOtp(phone, code);
      
      // Force reload or redirect based on user role handled by AuthContext or API response
      // But verifyOtp usually just sets the user state. 
      // We need to know the role to redirect correctly.
      // Since verifyOtp is void, we might need to fetch user or just reload and let middleware/root handle?
      // Better: verifyOtp could return user data.
      // For now, let's assume a hard reload to root, and root should redirect to dashboard.
      // Or we can manually fetch me to decide.
      
      // Let's assume a generic redirect for now, but ideally we should check role.
      // Since we don't have the user object here immediately after verifyOtp without refetching...
      // Let's rely on a hard coded check or a simple reload.
      
      // A safe bet is to redirect to home '/' and let middleware redirect to dashboard if needed,
      // OR redirect to a "portal" page that decides.
      
      // Update: Let's do a fetch to /api/auth/me to get the role and redirect.
      const res = await fetch('/api/auth/me');
      const data = await res.json();
      const role = data.user.role;
      
      if (role === 'admin' || role === 'admin_time') {
        window.location.href = '/admin/dashboard';
      } else if (role === 'organizador' || role === 'organizador_liga') {
        window.location.href = '/organizer/dashboard';
      } else if (role === 'arbitro') {
        window.location.href = '/referee/dashboard';
      } else if (role === 'super_admin') {
        window.location.href = '/saas/dashboard';
      } else {
        // Torcedor / Socio
        window.location.href = '/fan/dashboard';
      }

    } catch (err: any) {
      setError(err.message || 'Código inválido');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value[0];
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-black flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      
      {/* Header with Logo */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-8">
        <div className="mx-auto w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-xl border border-white/20 mb-6">
          <ShieldCheck className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold font-heading text-white tracking-tight">
          {authMethod === 'email' ? 'Bem-vindo de volta' : 'Acesso via WhatsApp'}
        </h2>
        <p className="mt-2 text-sm text-gray-300">
          {authMethod === 'email' 
            ? 'Acesse sua conta para gerenciar seu time' 
            : whatsappStep === 'phone' 
              ? 'Digite seu celular para receber o código'
              : `Enviamos um código para ${phone}`
          }
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 shadow-2xl sm:rounded-2xl border border-gray-100 relative overflow-hidden">
          
          {/* Top Tabs */}
          {whatsappStep === 'phone' && (
            <div className="flex bg-gray-100 p-1 rounded-xl mb-8">
              <button
                onClick={() => setAuthMethod('email')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                  authMethod === 'email'
                    ? 'bg-white text-primary-900 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Mail className="w-4 h-4" />
                Email
              </button>
              <button
                onClick={() => setAuthMethod('whatsapp')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                  authMethod === 'whatsapp' 
                    ? 'bg-[#25D366] text-white shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </button>
            </div>
          )}

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              {error}
            </div>
          )}

          {/* Dev Mode OTP Display */}
          {devCode && whatsappStep === 'otp' && (
            <div className="mb-6 bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-xl text-sm">
              <strong>[DEV MODE]</strong> Seu código é: {devCode}
            </div>
          )}

          {authMethod === 'email' ? (
            /* EMAIL LOGIN FORM */
            <form className="space-y-5" onSubmit={handleEmailLogin}>
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Senha</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white transition-all sm:text-sm"
                    placeholder="Sua senha"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <Link href="/auth/forgot-password" className="font-medium text-primary-600 hover:text-primary-500">
                    Esqueci minha senha
                  </Link>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Entrar na conta'}
              </button>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Não tem uma conta?</span>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <Link href="/auth/register" className="font-medium text-primary-600 hover:text-primary-500">
                    Criar conta gratuitamente
                  </Link>
                </div>
              </div>
            </form>
          ) : (
            /* WHATSAPP LOGIN FLOW */
            <div className="space-y-6">
              {whatsappStep === 'phone' ? (
                <form onSubmit={handleRequestOtp} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Número do Celular (WhatsApp)
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
                        className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#25D366]/20 focus:border-[#25D366] focus:bg-white transition-all sm:text-sm"
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-[#25D366] hover:bg-[#128C7E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#25D366] transition-all disabled:opacity-70"
                  >
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                      <>
                        <MessageCircle className="w-5 h-5" />
                        Receber código no WhatsApp
                      </>
                    )}
                  </button>
                </form>
              ) : (
                /* OTP VERIFICATION STEP */
                <form onSubmit={handleVerifyOtp} className="space-y-6">
                  <div className="flex justify-center gap-2">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        className="w-12 h-14 text-center text-2xl font-bold border border-gray-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                      />
                    ))}
                  </div>

                  <div className="text-center text-sm text-gray-500">
                    {timer > 0 ? (
                      <span>Reenviar código em 00:{timer.toString().padStart(2, '0')}</span>
                    ) : (
                      <button 
                        type="button" 
                        onClick={() => { setWhatsappStep('phone'); setTimer(30); }}
                        className="text-primary-600 font-medium hover:underline"
                      >
                        Reenviar código
                      </button>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all disabled:opacity-70"
                  >
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Confirmar código'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setWhatsappStep('phone')}
                    className="w-full text-sm text-gray-500 hover:text-gray-700"
                  >
                    Voltar e alterar número
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-xs text-white/50 flex items-center justify-center gap-2">
            <Lock className="w-3 h-3" />
            Acesso seguro • Dados protegidos
          </p>
        </div>
      </div>
    </div>
  );
}
