import Page from "@/components/Page";
import useCart from "@/hooks/useCart";
import helper from "@/lib/helper";
import { FC } from "react";

interface cartProps {}

function formatCurency(value: number): string {
  return "$" + value.toFixed(2);
}

const CartPage: FC<cartProps> = ({}) => {
  const cart = useCart();
  console.log("cart", cart);
  const cartItems = helper(cart);
  console.log("[CartPage] cart", cart);
  return (
    <Page title='Cart Page'>
      {cart && (
        <table>
          <thead>
            <tr>
              <th className='px-4 py-2'>Product</th>
              <th className='px-4 py-2'>Price</th>
              <th className='px-4 py-2'>Quantity</th>
              <th className='px-4 py-2'>Total</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.items.map((item: any) => (
              <tr key={item.id}>
                <td className='px-4 py-2 font-bold'>{item.product.title}</td>
                <td className='px-4 py-2 text-right'>
                  {formatCurency(item.product.price)}
                </td>
                <td className='px-4 py-2 text-right'>{item.quantity}</td>
                <td className='px-4 py-2 text-right'>
                  {formatCurency(item.total)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td className='px-4 py-2 text-right font-extrabold'>Total</td>
              <td></td>
              <td></td>
              <td className='px-4 py-2 text-right font-bold'>
                {formatCurency(cartItems.total)}
              </td>
            </tr>
          </tfoot>
        </table>
      )}
    </Page>
  );
};

export default CartPage;
