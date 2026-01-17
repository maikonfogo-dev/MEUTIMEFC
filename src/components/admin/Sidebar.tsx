"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  Shirt, 
  Trophy, 
  Settings, 
  LogOut,
  Newspaper,
  CreditCard,
  Briefcase,
  Calendar,
  Star,
  Crown,
  Bell
} from "lucide-react";
import clsx from "clsx";
import { useAuth } from "@/context/AuthContext";
import { PermissionKey } from "@/types/auth";

type SidebarItem = {
  name: string;
  href: string;
  icon: any;
  permission?: PermissionKey;
};

const sidebarItems: SidebarItem[] = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard }, // Always visible if in admin
  { name: "Jogadores", href: "/admin/players", icon: Users, permission: "auth.gerenciar_usuarios" },
  { name: "Partidas", href: "/admin/matches", icon: Calendar, permission: "transmissao.ver_metricas" }, // Proxy for match management
  { name: "Patrocinadores", href: "/admin/sponsors", icon: Briefcase, permission: "sistema.configuracoes" },
  { name: "Loja / Produtos", href: "/admin/store", icon: Shirt, permission: "loja.ver_pedidos" },
  { name: "Gestão de Ligas", href: "/admin/league/dashboard", icon: Trophy, permission: "liga.ver_dashboard" },
  { name: "Campeonatos (Time)", href: "/admin/championships", icon: Star, permission: "transmissao.ver_metricas" },
  { name: "Notícias", href: "/admin/news", icon: Newspaper, permission: "sistema.configuracoes" },
  { name: "Notificações", href: "/admin/notifications", icon: Bell, permission: "sistema.configuracoes" },
  { name: "Sócios", href: "/admin/members", icon: CreditCard, permission: "auth.gerenciar_usuarios" },
  { name: "Planos", href: "/admin/plans", icon: Crown, permission: "auth.gerenciar_usuarios" },
  { name: "Assinatura", href: "/admin/subscription", icon: Star, permission: "sistema.configuracoes" },
  { name: "Configurações", href: "/admin/settings", icon: Settings, permission: "sistema.configuracoes" },
];

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const { hasPermission, user } = useAuth();

  // Filter items based on permissions
  const filteredItems = sidebarItems.filter(item => {
    if (!item.permission) return true;
    return hasPermission(item.permission);
  });

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={clsx(
          "fixed inset-0 bg-gray-900/50 z-40 transition-opacity lg:hidden",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside 
        className={clsx(
          "fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 z-50 flex flex-col transition-transform duration-300 lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-16 flex items-center px-6 border-b border-gray-200 justify-between">
          <div className="flex items-center">
            <span className="text-xl font-bold font-heading text-primary-600">MeuTime FC</span>
            <span className="ml-2 text-xs bg-primary-50 text-primary-700 px-2 py-0.5 rounded font-medium border border-primary-100">
              {user?.role === 'super_admin' ? 'SaaS' : 'Admin'}
            </span>
          </div>
          <button onClick={onClose} className="lg:hidden text-gray-500 hover:text-gray-700">
            <span className="sr-only">Fechar menu</span>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {filteredItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary-50 text-primary-900"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <item.icon className={clsx("w-5 h-5", isActive ? "text-primary-600" : "text-gray-400")} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <Link href="/auth/login" className="flex items-center gap-3 px-3 py-2 w-full text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors">
            <LogOut className="w-5 h-5" />
            Sair
          </Link>
        </div>
      </aside>
    </>
  );
}
