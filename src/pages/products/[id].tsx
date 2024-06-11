// Options 2 : Using Incremental Static Regeneration
import { ParsedUrlQuery } from "querystring";
import { getProduct, getProducts, Product } from "@/lib/product";
import { GetStaticPaths, GetStaticProps } from "next";
import { ApiError } from "@/lib/utils";
import Image from "next/image";
import Page from "@/components/Page";
import AddToCart from "@/components/AddToCart";
import useUser from "@/hooks/user";

interface ProductPageParams extends ParsedUrlQuery {
  id: string;
}

interface ProductPageProps {
  product: Product;
}

export const getStaticPaths: GetStaticPaths<ProductPageParams> = async () => {
  const products = await getProducts();
  return {
    paths: products.map((product) => ({
      params: { id: product.id.toString() },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<
  ProductPageProps,
  ProductPageParams
> = async ({ params: { id } }: any) => {
  try {
    const product = await getProduct(id);
    return {
      props: { product },
      revalidate: Number(process.env.REVALIDATE_SECONDS),
    };
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) {
      return {
        notFound: true,
      };
    }
    throw err;
  }
};

interface ProductPageProps {
  product: Product;
}
export default function ProductPage({ product }: ProductPageProps) {
  console.log("[Product Page] render");
  const user = useUser();
  return (
    <Page title={product.title}>
      <div className='flex flex-col lg:flex-row'>
        <div>
          <Image
            src={product.pictureUrl}
            alt='plant'
            width={640}
            height={380}
          />
        </div>
        <div className='flex-1 lg:ml-4'>
          <p className='text-sm'>{product.description}</p>
          <p className='text-lg font-bold mt-2'>{product.price}</p>
          {user && <AddToCart productId={product.id} />}
        </div>
      </div>
    </Page>
  );
}
