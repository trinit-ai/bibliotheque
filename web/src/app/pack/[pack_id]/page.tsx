"use client";

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PackSessionPage() {
  const params = useParams<{ pack_id: string }>();
  const router = useRouter();

  // Redirect to unified session shell
  useEffect(() => {
    router.replace(`/book/${params.pack_id}`);
  }, [params.pack_id, router]);

  return null;
}
