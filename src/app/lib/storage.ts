import { Cart } from "../models/Cart";

export const saveCartToStorage = (cart: Cart) => {
    localStorage.setItem("cart", cart.toJSON());
};

export const loadCartFromStorage = (): Cart => {
    const json = localStorage.getItem("cart");
    if (json) {
        return Cart.fromJSON(json);
    }
    return new Cart();
};
