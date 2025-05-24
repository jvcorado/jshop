"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { products } from "@/app/mocks/product";
import { loadCartFromStorage, saveCartToStorage } from "@/app/lib/storage";
import { Cart, CartItem } from "@/app/models/Cart";
import { toast } from "sonner";

interface FreteInfo {
  endereco: string;
  valor: number;
}

interface CartContextType {
  cart: Cart;
  subtotal: number;
  frete: FreteInfo | null;
  setFrete: (frete: FreteInfo) => void;
  addItem: (item: CartItem) => void;
  removeItem: (item: CartItem) => void;
  updateQuantity: (item: CartItem, delta: number) => void;
  clearCart: () => void;
  finalizePurchase: () => void;
  openCart: boolean;
  setOpenCart: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Cart>(new Cart());
  const [frete, setFrete] = useState<FreteInfo | null>(null);
  const [openCart, setOpenCart] = useState(false); // novo estado

  useEffect(() => {
    setCart(loadCartFromStorage());
    const savedFrete = localStorage.getItem("frete");
    if (savedFrete) {
      setFrete(JSON.parse(savedFrete));
    }
  }, []);

  const addItem = (item: CartItem) => {
    const product = products.find(
      (p) => String(p.id) === String(item.productId)
    );
    const stock =
      product?.sizes.find((s) => s.size === item.size && s.color === item.color)
        ?.stock ?? 0;

    if (stock === 0) {
      toast.error("Este item está fora de estoque.");
      return;
    }

    try {
      const updated = new Cart(cart.getItems());
      updated.addItem(item, stock);
      saveCartToStorage(updated);
      setCart(updated);
      setOpenCart(true); // abre carrinho automaticamente
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Erro ao adicionar produto"
      );
    }
  };

  const removeItem = (item: CartItem) => {
    const updated = new Cart(cart.getItems());
    updated.removeItem(item);
    saveCartToStorage(updated);
    setCart(updated);
  };

  const updateQuantity = (item: CartItem, delta: number) => {
    const product = products.find(
      (p) => String(p.id) === String(item.productId)
    );
    const stock =
      product?.sizes.find((s) => s.size === item.size && s.color === item.color)
        ?.stock ?? 0;

    const updated = new Cart(cart.getItems());
    try {
      updated.updateQuantity(item, delta, stock);
      saveCartToStorage(updated);
      setCart(updated);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Erro ao atualizar quantidade",
        {
          position: "top-right",
        }
      );
    }
  };

  const clearCart = () => {
    const empty = new Cart();
    setCart(empty);
    setFrete(null);
    localStorage.removeItem("cart");
    localStorage.removeItem("frete");
  };

  const subtotal = cart.getItems().reduce((acc, item) => {
    const product = products.find(
      (p) => String(p.id) === String(item.productId)
    );
    return acc + (product?.price || 0) * item.quantity;
  }, 0);

  const finalizePurchase = () => {
    if (!frete) {
      toast.error("Por favor, preencha o CEP para calcular o frete.", {
        position: "top-right",
      });
      return;
    }

    clearCart();
    toast.success("Compra realizada com sucesso!", {
      position: "top-right",
    });
    setOpenCart(false);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        subtotal,
        frete,
        setFrete,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        finalizePurchase,
        openCart,
        setOpenCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }
  return context;
};
