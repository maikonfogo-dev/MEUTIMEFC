import { BottomNav } from "@/components/team/BottomNav";
import { StoreProvider } from "@/context/StoreContext";

export default async function TeamLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <StoreProvider>
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="mx-auto max-w-md bg-white min-h-screen shadow-lg relative">
          {children}
          <BottomNav slug={slug} />
        </div>
      </div>
    </StoreProvider>
  );
}
