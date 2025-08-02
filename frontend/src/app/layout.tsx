"use client";
import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { useAuthStore } from '../lib/auth-store';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-heading",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);
  const user = useAuthStore((state) => state.user);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    if (user && (pathname === '/login' || pathname === '/register')) {
      router.push('/');
    }
  }, [user, pathname, router]);

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${inter.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
