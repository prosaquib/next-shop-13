import { fetchJson } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

async function getCartItems() {
    try {
        return await fetchJson("/api/cart", { method: "GET" });
    } catch (err) {
        console.log("err", err);
        // return undefined
    }
}
export default function useCart() {
    const { data: cart } = useQuery({
        queryKey: ["cartItems"], queryFn: getCartItems,
        staleTime: 30_000 // 30 seconds
    })

    return cart;
}