// Options 2 : Using Incremental Static Regeneration
import { Product, getProducts } from "../lib/product";
import ProductCard from "@/components/ProductCard";
import Page from "@/components/Page";

interface HomePageProps {
  products: Product[];
}
export async function getStaticProps() {
  const products = await getProducts();
  return {
    props: {
      products,
    },
    revalidate: Number(process.env.REVALIDATE_SECONDS), // 10 seconds
  };
}
export default function HomePage({ products }: HomePageProps) {
  console.log("[HomePage] render", products);
  return (
    <Page title='Indoor plants'>
      <ul className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
        {products.map((product: Product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </Page>
  );
}
