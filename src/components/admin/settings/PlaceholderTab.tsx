import { LucideIcon } from 'lucide-react';

interface PlaceholderTabProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export default function PlaceholderTab({ title, description, icon: Icon }: PlaceholderTabProps) {
  return (
    <div className="bg-white p-12 rounded-xl border border-gray-200 shadow-sm text-center animate-in fade-in duration-500">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-50 mb-6">
        <Icon className="w-8 h-8 text-primary-600" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 max-w-md mx-auto mb-8">{description}</p>
      <button className="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-bold hover:bg-gray-50 transition-colors">
        Configurar Agora
      </button>
    </div>
  );
}
