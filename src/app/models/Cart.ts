export type CartItem = {
    productId: string;
    color: string;
    size: string;
    quantity: number;
};


export class Cart {
    private items: CartItem[] = [];

    constructor(initialItems?: CartItem[]) {
        if (initialItems) this.items = initialItems;
    }

    addItem(item: CartItem, stock: number) {
        const existing = this.items.find(
            (i) => i.productId === item.productId && i.size === item.size && i.color === item.color
        );

        if (existing) {
            if (existing.quantity + item.quantity > stock) {
                throw new Error("Quantidade excede o estoque disponível.");
            }
            existing.quantity += item.quantity;
        } else {
            if (item.quantity > stock) {
                throw new Error("Quantidade excede o estoque disponível.");
            }
            this.items.push(item);
        }
    }

    removeItem(item: CartItem) {
        this.items = this.items.filter(
            (i) =>
                !(i.productId === item.productId &&
                    i.size === item.size &&
                    i.color === item.color)
        );
    }

    updateQuantity(item: CartItem, delta: number, stock: number) {
        const target = this.items.find(
            (i) => i.productId === item.productId && i.size === item.size && i.color === item.color
        );
        if (target) {
            const newQty = target.quantity + delta;
            if (newQty > stock) return;
            target.quantity = Math.max(1, newQty);
        }
    }

    getItems() {
        return this.items;
    }

    toJSON() {
        return JSON.stringify(this.items);
    }

    static fromJSON(json: string): Cart {
        const data = JSON.parse(json);
        return new Cart(data);
    }
}
