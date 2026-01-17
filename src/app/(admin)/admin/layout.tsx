"use client";

import { useState, useRef, useEffect } from "react";
import { AdminSidebar } from "@/components/admin/Sidebar";
import { Menu, Search, Bell, LogOut, User, ChevronDown, Settings } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const userMenuRef = useRef<HTMLDivElement>(null);
  
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [userMenuRef, setUserMenuOpen]);

  const handleLogout = async () => {
    await logout();
    router.push("/auth/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="lg:pl-64 min-h-screen flex flex-col">
        <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-30 flex items-center justify-between px-4 sm:px-8 shadow-sm">
          <div className="flex items-center gap-4 flex-1">
            <button 
              className="lg:hidden text-gray-500 hover:text-gray-700 p-1"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            
            {/* Search Bar */}
            <div className="hidden md:flex items-center relative w-full max-w-md ml-4">
              <Search className="w-5 h-5 text-gray-400 absolute left-3" />
              <input 
                type="text"
                placeholder="Pesquisar..." 
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* Mobile Title (visible only when search is hidden or on very small screens) */}
            <h2 className="md:hidden text-lg font-semibold text-gray-800 ml-2">MeuTime FC</h2>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-6">
             {/* Mobile Search Icon */}
             <button className="md:hidden text-gray-500 hover:text-primary-600 p-2 rounded-full hover:bg-gray-100">
               <Search className="w-5 h-5" />
             </button>

             {/* Notifications */}
             <button className="text-gray-500 hover:text-primary-600 p-2 rounded-full hover:bg-gray-100 relative">
               <Bell className="w-5 h-5" />
               <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
             </button>

             {/* User Dropdown */}
             <div className="relative" ref={userMenuRef}>
               <button 
                 onClick={() => setUserMenuOpen(!userMenuOpen)}
                 className="flex items-center gap-3 hover:bg-gray-50 p-1.5 rounded-lg transition-colors"
               >
                 <div className="text-right hidden sm:block">
                   <p className="text-sm font-medium text-gray-900">{user?.name || 'Usuário'}</p>
                   <p className="text-xs text-gray-500">{user?.role === 'admin_time' ? 'Admin do Time' : 'Membro'}</p>
                 </div>
                <div className="w-9 h-9 rounded-full bg-primary-100 overflow-hidden border border-primary-200 p-0.5">
                  <Image
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'User'}`}
                    alt="Avatar"
                    width={36}
                    height={36}
                    className="w-full h-full rounded-full"
                  />
                </div>
                 <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${userMenuOpen ? 'rotate-180' : ''} hidden sm:block`} />
               </button>

               {/* Dropdown Menu */}
               {userMenuOpen && (
                 <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2">
                   <div className="px-4 py-3 border-b border-gray-100 sm:hidden">
                     <p className="text-sm font-medium text-gray-900">{user?.name || 'Usuário'}</p>
                     <p className="text-xs text-gray-500">{user?.email}</p>
                   </div>
                   
                   <Link 
                     href="/admin/settings?tab=users" 
                     className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                     onClick={() => setUserMenuOpen(false)}
                   >
                     <User className="w-4 h-4" />
                     Meu Perfil
                   </Link>
                   <Link 
                     href="/admin/settings" 
                     className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                     onClick={() => setUserMenuOpen(false)}
                   >
                     <Settings className="w-4 h-4" />
                     Configurações
                   </Link>
                   
                   <div className="h-px bg-gray-100 my-1"></div>
                   
                   <button 
                     onClick={handleLogout}
                     className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 text-left"
                   >
                     <LogOut className="w-4 h-4" />
                     Sair
                   </button>
                 </div>
               )}
             </div>
          </div>
        </header>
        
        <div className="p-4 sm:p-8 flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}
