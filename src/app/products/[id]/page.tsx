"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { products } from "@/app/mocks/product";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { CartItem } from "@/app/models/Cart";
import { toast } from "sonner";

export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addItem } = useCart();

  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState<string>(product?.images[0] || "");

  if (!product) return notFound();

  console.log(selectedColor, "selectedColor");
  console.log(selectedSize, "selectedSize");
  console.log(product, "product");

  const availableSizes = selectedColor
    ? product.sizes.filter((s) => s.color === selectedColor)
    : product.sizes;

  const uniqueSizes = Array.from(new Set(availableSizes.map((s) => s.size)));

  const getStockForSize = (size: string) => {
    return (
      product.sizes.find((s) => s.size === size && s.color === selectedColor)
        ?.stock ?? 0
    );
  };

  /*   const handleQuantityChange = (delta: number) => {
    if (!selectedColor || !selectedSize || !product) return;

    const item: CartItem = {
      productId: String(product.id),
      color: selectedColor,
      size: selectedSize,
      quantity: 1,
    };

    updateQuantity(item, delta);
  }; */

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      toast.error("Selecione cor e tamanho.", {
        description:
          "Por favor, escolha uma cor e um tamanho antes de adicionar ao carrinho.",
        position: "top-right",
      });

      return;
    }

    if (!product) {
      alert("Produto não encontrado.");
      return;
    }

    const item: CartItem = {
      productId: String(product.id),
      color: selectedColor,
      size: selectedSize,
      quantity: 1,
    };

    addItem(item);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-[35%] flex flex-col gap-4">
          <Image
            src={mainImage}
            alt={product.name}
            width={500}
            height={500}
            className="rounded-md object-cover w-full h-[500px]"
          />
          <div className="flex gap-2 overflow-x-auto">
            {product.images.map((src, idx) => (
              <Image
                key={idx}
                src={src}
                alt={`Thumb ${idx + 1}`}
                width={80}
                height={80}
                onClick={() => setMainImage(src)}
                className={`rounded-md object-cover  cursor-pointer ${
                  mainImage === src ? "" : ""
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <h1 className="text-2xl font-semibold">{product.name}</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            {product.rating.toFixed(1)} ({product.reviews} avaliações)
          </div>
          <div className="text-2xl font-bold text-primary">
            R$ {product.price.toFixed(2)}
          </div>
          <p className="text-muted-foreground text-sm">{product.description}</p>

          <div className="space-y-1">
            <span className="text-sm font-medium">Cor</span>
            <div className="flex gap-2">
              {product.colors.map((color, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedColor(color.name);
                    setSelectedSize(null); // resetar tamanho ao mudar cor
                  }}
                  style={{ backgroundColor: color.value }}
                  className={`w-6 h-6 rounded-full border ${
                    selectedColor === color.value
                      ? "ring-2 ring-primary"
                      : "border-gray-300"
                  }`}
                  aria-label={color.name}
                />
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-sm font-medium">Tamanho</span>
            <div className="flex gap-2 flex-wrap">
              {uniqueSizes.map((size) => {
                const stock = getStockForSize(size);
                return (
                  <Button
                    variant={selectedSize === size ? "default" : "outline"}
                    key={size}
                    disabled={stock === 0}
                    className="px-4 py-2"
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </Button>
                );
              })}
            </div>
          </div>

          <div className="flex gap-2">
            <Button className="flex-1" onClick={handleAddToCart}>
              Adicionar ao carrinho
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-10  hidden md:flex">
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="w-full justify-start gap-4 border-b">
            <TabsTrigger value="details">Detalhes do produto</TabsTrigger>
            <TabsTrigger value="specs">Especificações</TabsTrigger>
            <TabsTrigger value="reviews">
              Avaliações ({product.reviews})
            </TabsTrigger>
            <TabsTrigger value="questions">Perguntas e respostas</TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <Card>
              <CardContent className="py-6">
                <p className="text-sm text-muted-foreground">
                  {product.tabs?.details}
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specs">
            <Card>
              <CardContent className="py-6">
                <p className="text-sm text-muted-foreground">
                  {product.tabs?.specs}
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews">
            <Card>
              <CardContent className="py-6">
                <p className="text-sm text-muted-foreground">
                  {product.tabs?.reviews}
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="questions">
            <Card>
              <CardContent className="py-6">
                <p className="text-sm text-muted-foreground">
                  {product.tabs?.questions}
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
