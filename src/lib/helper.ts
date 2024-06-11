import { CartItem } from "@/pages/api/cart";

export default function helper(cartItems: any[]) {
    console.log('[cartItems]', cartItems);
    const items = [];
    let total = 0.0;
    for (const cartItem of cartItems) {
        const itemTotal = (cartItem.product.price ?? 0) * (cartItem.quantity ?? 1);
        total += itemTotal;
        items.push({ ...cartItem, total: itemTotal });
    }
    return {
        items,
        total
    }
}