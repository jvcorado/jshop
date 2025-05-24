"use client";

import Link from "next/link";
import Image from "next/image";
import { products } from "@/app/mocks/product";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Products() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6">Produtos</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="flex flex-col justify-between">
            <Link href={`/products/${product.id}`}>
              <Image
                src={product.images[0]}
                alt={product.name}
                width={400}
                height={400}
                className="rounded-md object-cover w-full h-[250px]"
              />
            </Link>
            <CardContent className="p-4 space-y-2">
              <h2 className="text-lg font-medium">{product.name}</h2>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {product.description}
              </p>
              <p className="text-xl font-semibold text-primary">
                R$ {product.price.toFixed(2)}
              </p>
              <Link href={`/products/${product.id}`}>
                <Button className="w-full mt-2">Ver detalhes</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
