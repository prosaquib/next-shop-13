import { Product } from "@/lib/product";
import Link from "next/link";
import Image from "next/image";

interface ProductCardProp {
  product: Product;
}
export default function ProductCard({ product }: ProductCardProp) {
  return (
    <div className='border w-80 shadow hover:shadow-xl'>
      <Link href={`/products/${product.id}`}>
        <Image src={product.pictureUrl} alt='' width={320} height={240} />
        <div className='p-2 flex justify-between items-baseline'>
          <h2 className='text-lg font-bold'>{product.title}</h2>
          <span>{product.price}</span>
        </div>
      </Link>
    </div>
  );
}
