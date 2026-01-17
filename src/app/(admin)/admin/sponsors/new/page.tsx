"use client";

import { SponsorForm } from "@/components/admin/SponsorForm";
import { Sponsor } from "@/types/team";
import { useRouter } from "next/navigation";

export default function NewSponsorPage() {
  const router = useRouter();

  const handleCreate = async (data: Sponsor) => {
    // In a real app, this would be an API call
    console.log("Creating sponsor:", data);
    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    router.push("/admin/sponsors");
  };

  return <SponsorForm onSubmit={handleCreate} />;
}
