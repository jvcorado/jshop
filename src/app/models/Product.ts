export class Product {
    constructor(
        public id: number,
        public name: string,
        public price: number,
        public sizes: string[],
        public stock: Record<string, number> // { "P": 5, "M": 2 }
    ) { }

    isAvailable(size: string): boolean {
        return this.stock[size] > 0;
    }
}
