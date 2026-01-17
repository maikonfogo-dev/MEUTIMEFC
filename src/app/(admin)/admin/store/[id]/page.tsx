"use client";

import { ProductForm } from "@/components/admin/ProductForm";
import { Jersey, TeamData } from "@/types/team";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function EditProductPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [product, setProduct] = useState<Jersey | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch('/api/team');
        const data: TeamData = await res.json();
        const foundProduct = data.jerseys?.find(p => p.id === params.id);
        setProduct(foundProduct || null);
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [params.id]);

  const handleUpdate = async (data: Jersey) => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/team');
      const teamData: TeamData = await res.json();

      const updatedJerseys = (teamData.jerseys || []).map(p => 
        p.id === params.id ? { ...data, id: params.id } : p
      );

      await fetch('/api/team', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...teamData, jerseys: updatedJerseys }),
      });

      router.push("/admin/store");
    } catch (error) {
      console.error('Failed to update product:', error);
      alert('Erro ao atualizar produto');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold text-gray-900">Produto não encontrado</h2>
        <p className="text-gray-500 mt-2">O produto que você está tentando editar não existe.</p>
      </div>
    );
  }

  return <ProductForm initialData={product} onSubmit={handleUpdate} isSubmitting={isSubmitting} />;
}
