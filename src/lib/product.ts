import { fetchJson } from "./utils";

export interface Product {
    id: number;
    title: string;
    description: string;
    price: string | number;
    pictureUrl: string;
}
const { CMS_URL } = process.env;
export function striProduct(product: any): Product {
    return {
        id: product.id,
        title: product.title,
        description: product.description,
        price: product.price,
        pictureUrl: CMS_URL + product.picture.url
    };
}

export async function getProduct(id: string): Promise<Product> {
    const product = await fetchJson(`${CMS_URL}/products/${id}`);
    return striProduct(product);
}

export async function getProducts(): Promise<Product[]> {
    const products = await fetchJson(`${CMS_URL}/products`);
    return products.map(striProduct);
}