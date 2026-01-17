// Simulação de serviço de pagamento (Mercado Pago)
export interface PaymentResponse {
  id: string;
  status: 'pending' | 'approved' | 'rejected';
  pix_code: string;
  qr_code_base64: string;
  expires_at: Date;
}

export const PaymentService = {
  async createPixPayment(amount: number, payer: { email: string; name: string }): Promise<PaymentResponse> {
    // Simula delay de rede
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simula resposta do Mercado Pago
    return {
      id: Math.random().toString(36).substring(7),
      status: 'pending',
      pix_code: "00020126580014BR.GOV.BCB.PIX0136123e4567-e89b-12d3-a456-4266141740005204000053039865802BR5913MeuTime FC6008Sao Paulo62070503***6304EA88",
      qr_code_base64: `https://api.dicebear.com/7.x/identicon/svg?seed=${amount}`, // Placeholder visual
      expires_at: new Date(Date.now() + 10 * 60 * 1000) // 10 minutos
    };
  }
};
