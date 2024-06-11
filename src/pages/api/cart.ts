import { Product, striProduct } from "@/lib/product";
import { fetchJson } from "@/lib/utils";
import { NextApiHandler } from "next";

const { CMS_URL } = process.env;

export interface CartItem {
    id: string;
    quantity: number;
    product: Product;
}

function stripCart(cartItem: CartItem) {
    return {
        id: cartItem.id,
        quantity: cartItem.quantity,
        product: striProduct(cartItem.product)
    }
}

const handleGetCart: NextApiHandler<CartItem[]> = async (req, res) => {
    console.log("Getting", req.method);
    const { jwt } = req.cookies;
    if (!jwt) {
        res.status(401).end();
        return;
    }
    try {
        const cartItems = await fetchJson(`${CMS_URL}/cart-items`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${jwt}`,
            }
        });
        const enhancedCart = cartItems.map(stripCart)
        res.status(200).json(enhancedCart)

    } catch (err) {
        res.status(401).end();
    }
}

const handlePostCart: NextApiHandler = async (req, res) => {
    const { jwt } = req.cookies;
    if (!jwt) {
        res.status(401).end();
        return;
    }
    const { productId, quantity } = req.body;
    try {
        await fetchJson(`${CMS_URL}/cart-items`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${jwt}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                product: productId,
                quantity
            })
        });
        res.status(200).json({});
    } catch (err) {
        res.status(401).end();
    }
}

const handleCart: NextApiHandler = (req, res) => {
    switch (req.method) {
        case 'GET':
            return handleGetCart(req, res);
        case 'POST':
            return handlePostCart(req, res);
        default:
            res.status(405).end();
            return;
    }
}

export default handleCart;