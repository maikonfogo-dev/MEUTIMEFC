'use client';

import CartDrawer from '@/components/store/CartDrawer';

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {children}
      <CartDrawer />
    </div>
  );
}
