"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { products } from "@/app/mocks/product";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const {
    cart,
    subtotal,
    removeItem,
    updateQuantity,
    frete,
    setFrete,
    finalizePurchase,
    openCart,
    setOpenCart,
  } = useCart();

  const [cep, setCep] = useState("");
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const total = subtotal + (frete?.valor || 0);

  const handleFrete = async () => {
    if (!cep) return;
    setLoading(true);
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await res.json();
      if (data.erro) throw new Error("CEP não encontrado");

      const valorFrete = 15.9;
      setFrete({
        endereco: `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`,
        valor: valorFrete,
      });
    } catch {
      alert("Erro ao buscar o CEP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="mx-auto container  px-4 ">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href={"/"} className="text-xl font-bold text-indigo-600">
              JShop
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/"
              className={`${
                pathname === "/"
                  ? "text-indigo-600 font-medium"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Home
            </Link>
            <Link
              href="/products"
              className={`${
                pathname === "/products"
                  ? "text-indigo-600 font-medium"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Produtos
            </Link>
            <Link
              href="/categorias"
              className={`${
                pathname === "/categorias"
                  ? "text-indigo-600 font-medium"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Categorias
            </Link>
            <Link
              href="/ofertas"
              className={`${
                pathname === "/ofertas"
                  ? "text-indigo-600 font-medium"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Ofertas
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <button className="text-gray-400 hover:text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            <button className="text-gray-400 hover:text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </button>
            {/* Botão do carrinho com Sheet */}
            <Sheet open={openCart} onOpenChange={setOpenCart}>
              <SheetTrigger asChild>
                <button className="text-gray-400 hover:text-gray-500 relative">
                  <ShoppingCart className="h-6 w-6" />
                  <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {cart
                      .getItems()
                      .reduce((acc, item) => acc + item.quantity, 0)}
                  </span>
                </button>
              </SheetTrigger>
              <SheetContent className="w-full sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Seu Carrinho</SheetTitle>
                </SheetHeader>

                <div className="mt-4 space-y-4">
                  {cart.getItems().length === 0 ? (
                    <p className="text-muted-foreground">
                      Seu carrinho está vazio.
                    </p>
                  ) : (
                    cart.getItems().map((item, index) => {
                      const product = products.find(
                        (p) => String(p.id) === String(item.productId)
                      );
                      if (!product) return null;

                      return (
                        <div key={index} className="flex gap-4 border-b pb-4">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h3 className="font-medium text-sm">
                              {product.name}
                            </h3>
                            <p className="text-xs text-muted-foreground">
                              Tamanho: {item.size} | Cor: {item.color}
                            </p>
                            <p className="text-sm font-semibold mt-1">
                              R$ {(product.price * item.quantity).toFixed(2)}
                            </p>
                            <div className="flex gap-1 mt-2 items-center">
                              <Button
                                size="icon"
                                variant="outline"
                                onClick={() => updateQuantity(item, -1)}
                              >
                                -
                              </Button>
                              <span className="px-2 text-sm">
                                {item.quantity}
                              </span>
                              <Button
                                size="icon"
                                variant="outline"
                                onClick={() => updateQuantity(item, 1)}
                              >
                                +
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => removeItem(item)}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {cart.getItems().length > 0 && (
                  <div className="mt-6 border-t pt-4 text-right space-y-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Subtotal:</p>
                      <p className="text-base font-medium">
                        R$ {subtotal.toFixed(2)}
                      </p>
                    </div>
                    <div className="space-y-2 text-left">
                      <p className="text-sm text-muted-foreground">
                        CEP para entrega:
                      </p>
                      <div className="flex gap-2">
                        <Input
                          placeholder="00000-000"
                          value={cep}
                          onChange={(e) => setCep(e.target.value)}
                        />
                        <Button onClick={handleFrete} disabled={loading}>
                          {loading ? "Buscando..." : "Calcular"}
                        </Button>
                      </div>
                    </div>
                    {frete && (
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Frete para:
                        </p>
                        <p className="text-sm">{frete.endereco}</p>
                        <p className="text-base font-medium">
                          + R$ {frete.valor.toFixed(2)}
                        </p>
                      </div>
                    )}
                    <div className="border-t pt-2">
                      <p className="text-muted-foreground text-sm">Total:</p>
                      <p className="text-xl font-bold">R$ {total.toFixed(2)}</p>
                    </div>

                    <Button onClick={finalizePurchase} className="mt-2 w-full">
                      Finalizar compra
                    </Button>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
