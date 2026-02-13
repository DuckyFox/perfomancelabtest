import { useAppSelector } from "@/shared/hooks";
import { selectCart } from "@/entities/CartSlice/model/cartSlice.ts";
import { CartItem } from "@/widgets/CartItem";

const Cart = () => {
    const cart = useAppSelector(selectCart);

    return (
        <div>
            {cart.map((productInfo) => (
                <CartItem key={productInfo.product.id} productInfo={productInfo} />
            ))}
        </div>
    );
};

export default Cart;
