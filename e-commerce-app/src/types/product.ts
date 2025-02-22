export interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    image: string;
    category: string;
    stock: number;
    rating: {
        rate: number;
        count: number;
    };
}