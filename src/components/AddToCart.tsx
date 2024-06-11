import { FC, useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import { fetchJson } from "@/lib/utils";

interface AddToCartProps {
  productId: number;
}

const AddToCart: FC<AddToCartProps> = ({ productId }) => {
  const [cartQunatity, setCartQunatity] = useState(1);
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async () => {
      await fetchJson("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          quantity: cartQunatity,
        }),
      });
      router.push("/cart");
    },
  });
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await mutation.mutateAsync();
      router.push("/cart");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          type='number'
          min={1}
          value={cartQunatity}
          onChange={(event) => setCartQunatity(Number(event.target.value))}
        />
        <Button type='submit'>Add To Cart</Button>
      </form>
    </div>
  );
};

export default AddToCart;
