"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6 text-center">
      <h1 className="text-6xl font-bold text-indigo-600">404</h1>
      <h2 className="text-2xl font-semibold mt-4">Página não encontrada</h2>
      <p className="text-gray-600 mt-2">
        A página que você está procurando não existe ou foi removida.
      </p>
      <Link href="/">
        <Button className="mt-6">Voltar para a Home</Button>
      </Link>
    </div>
  );
}
