// Options 2 : Using Incremental Static Regeneration
import Head from "next/head";
import Title from '../components/Title';
import {getProducts} from '../lib/product';
import { HomePageProps, IProduct } from "./index-1a";

export async function getServerSideProps() {
  const products = await getProducts();
  return {
    props: { 
      products,
    }
  }
}
export default function HomePage({ products }: HomePageProps) {
  console.log('[HomePage] render', products);
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
