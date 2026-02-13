import {memo, useCallback} from "react";
import type { ICartItem } from "@/entities/CartSlice";
import { useAppDispatch } from "@/shared/hooks";
import {
    decreaseAmountInCart,
    increaseAmountInCart,
    removeFromCart,
} from "@/entities/CartSlice/model/cartSlice.ts";
import { Button } from "@/shared/ui";
import { Minus, Plus, Trash2 } from "lucide-react";

interface CartItemProps {
    productInfo: ICartItem;
}

const CartItem = memo((props: CartItemProps) => {
    const { productInfo } = props;
    const dispatch = useAppDispatch();
    const { amount, product } = productInfo;

    const { id, name, price, image, category } = product;

    const totalPrice = price * amount;

    const handleIncreaseAmountInCart = useCallback(() => {dispatch(increaseAmountInCart(id))}, [dispatch, id])
    const handleDecreaseAmountInCart = useCallback(() => {dispatch(decreaseAmountInCart(id))}, [dispatch, id])
    const handleRemoveFromCart = useCallback(() => {dispatch(removeFromCart(id))}, [dispatch, id])

    return (
        <div className={`flex gap-4 p-4 border-b border-border last:border-b-0`}>
            <img
                src={image}
                alt={name}
                className={`w-20 h-20 object-cover rounded-lg flex-shrink-0`}
            />
            <div className={`flex-1 flex flex-col gap-2 min-w-0`}>
                <div className={`flex items-start justify-between gap-2`}>
                    <div className={`flex-1 min-w-0`}>
                        <h3 className={`font-medium text-sm line-clamp-2`}>{name}</h3>
                        <p className={`text-xs text-muted-foreground mt-1`}>{category}</p>
                    </div>
                    <Button
                        variant={`ghost`}
                        size={`icon`}
                        className={`h-8 w-8 flex-shrink-0`}
                        onClick={handleRemoveFromCart}
                    >
                        <Trash2 className={`h-4 w-4 text-destructive`} />
                    </Button>
                </div>

                <div className={`flex items-center justify-between`}>
                    <div className={`flex items-center gap-2`}>
                        <Button
                            variant={`outline`}
                            size={`icon`}
                            className={`h-8 w-8`}
                            onClick={handleDecreaseAmountInCart}
                            disabled={amount <= 1}
                        >
                            <Minus className={`h-4 w-4`} />
                        </Button>
                        <span className={`w-8 text-center font-medium`}>{amount}</span>
                        <Button
                            variant={`outline`}
                            size={`icon`}
                            className={`h-8 w-8`}
                            onClick={handleIncreaseAmountInCart}
                        >
                            <Plus className={`h-4 w-4`} />
                        </Button>
                    </div>
                    <div className={`text-right`}>
                        <p className={`font-semibold`}>{totalPrice} ₽</p>
                        {amount > 1 && (
                            <p className={`text-xs text-muted-foreground`}>{price} ₽ за шт.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
});

export default CartItem;
