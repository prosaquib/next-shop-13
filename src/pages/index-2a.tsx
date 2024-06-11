import { useEffect, useState } from "react";
import Title from "../components/Title";
import Head from "next/head";
import { getProducts } from "@/lib/product";
import { IProduct } from "./index-1a";

//Option 2b: Fetching data from an internal server (BFF)
export default function HomePage() {
  const [products, setProducts] = useState<Record<string, any>>([]);
  console.log('[HomePage] render', products);

  useEffect(() => {
    (async () => {
      const response = await fetch('/api/product');
      const products = await response.json();
      setProducts(products);
    })();
  },[])

  return (
    <>
      <Head>
        <title>Next Shop</title>
      </Head>
      <main>
        <Title>Next Shop</Title>
      </main>
      <ul>
      {products.map((product: IProduct) => <li key={product.id}>{product.title}</li>)}
      </ul>
    </>
  );
}
