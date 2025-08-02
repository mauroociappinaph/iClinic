"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../lib/auth-store";

export default function HomePage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) {
    return null; // Or a loading spinner
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold">Welcome, {user.email}!</h1>
    </div>
  );
}