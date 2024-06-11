import { useEffect, useState } from "react";
import Title from "../components/Title";
import Head from "next/head";
import { getProducts } from "@/lib/product";
import { IProduct } from "./index-1a";

// Options 2a. Fetching data from the external API server
export default function HomePage() {
  const [products, setProducts] = useState<Record<string, any>>([]);
  console.log('[HomePage] render', products);

  useEffect(() => {
    getProducts().then(setProducts)
  } ,[])

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
