"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, Calendar, ShoppingBag, Menu } from 'lucide-react';
import clsx from 'clsx';

interface BottomNavProps {
  slug: string;
}

export function BottomNav({ slug }: BottomNavProps) {
  const pathname = usePathname();
  const baseUrl = `/team/${slug}`;

  const links = [
    { name: 'Início', href: baseUrl, icon: Home },
    { name: 'Elenco', href: `${baseUrl}/squad`, icon: Users },
    { name: 'Jogos', href: `${baseUrl}/matches`, icon: Calendar },
    { name: 'Loja', href: `${baseUrl}/store`, icon: ShoppingBag },
    { name: 'Mais', href: `${baseUrl}/about`, icon: Menu },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-md border-t border-gray-200 pb-safe z-50 transition-all duration-300">
      <div className="flex justify-around items-center h-16">
        {links.map((link) => {
          const isActive = pathname === link.href || (link.href !== baseUrl && pathname.startsWith(link.href));
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                "flex flex-col items-center justify-center w-full h-full relative group",
                isActive ? "text-primary-600" : "text-gray-500 hover:text-gray-900"
              )}
            >
              {isActive && (
                <span className="absolute -top-[1px] w-8 h-1 bg-primary-600 rounded-b-full shadow-sm shadow-primary-500/50" />
              )}
              <link.icon className={clsx("w-6 h-6 mb-1 transition-transform group-active:scale-90", isActive && "fill-current opacity-100")} />
              <span className={clsx("text-[10px] font-bold transition-colors", isActive ? "text-primary-700" : "text-gray-400")}>
                {link.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
