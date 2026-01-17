import { AlertCircle, CheckCircle, Loader2, PackageX, XCircle } from "lucide-react";
import Link from "next/link";

type FeedbackType = 'loading' | 'payment_error' | 'out_of_stock' | 'order_cancelled' | 'success';

interface StoreFeedbackProps {
  type: FeedbackType;
  message?: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
}

export default function StoreFeedback({ type, message, action }: StoreFeedbackProps) {
  const config = {
    loading: {
      icon: <Loader2 className="w-12 h-12 text-primary-600 animate-spin" />,
      title: "Carregando...",
      bg: "bg-gray-50",
      color: "text-gray-900"
    },
    payment_error: {
      icon: <XCircle className="w-12 h-12 text-red-500" />,
      title: "Erro no Pagamento",
      bg: "bg-red-50",
      color: "text-red-900"
    },
    out_of_stock: {
      icon: <PackageX className="w-12 h-12 text-orange-500" />,
      title: "Estoque Esgotado",
      bg: "bg-orange-50",
      color: "text-orange-900"
    },
    order_cancelled: {
      icon: <AlertCircle className="w-12 h-12 text-gray-500" />,
      title: "Pedido Cancelado",
      bg: "bg-gray-100",
      color: "text-gray-900"
    },
    success: {
      icon: <CheckCircle className="w-12 h-12 text-green-500" />,
      title: "Sucesso!",
      bg: "bg-green-50",
      color: "text-green-900"
    }
  };

  const current = config[type];

  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center rounded-2xl ${current.bg} animate-in fade-in duration-300 h-full min-h-[300px]`}>
      <div className="mb-4 bg-white p-4 rounded-full shadow-sm">
        {current.icon}
      </div>
      <h3 className={`text-xl font-bold font-heading mb-2 ${current.color}`}>
        {current.title}
      </h3>
      {message && (
        <p className="text-gray-600 mb-6 max-w-xs mx-auto leading-relaxed">
          {message}
        </p>
      )}
      {action && (
        action.href ? (
          <Link 
            href={action.href}
            className="bg-primary-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/20 active:scale-95"
          >
            {action.label}
          </Link>
        ) : (
          <button
            onClick={action.onClick}
            className="bg-primary-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/20 active:scale-95"
          >
            {action.label}
          </button>
        )
      )}
    </div>
  );
}
