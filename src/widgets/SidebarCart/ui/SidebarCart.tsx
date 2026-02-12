import {useAppSelector} from "@/shared/hooks";
import {selectCart} from "@/entities/SidebarCartSlice/model/sidebarCartSlice.ts";
import {SidebarCartItem} from "@/widgets/SidebarCartItem";



const SidebarCart = () => {

    const cart = useAppSelector(selectCart)

    console.log(cart)

    return (

        <div>
            {
                cart.map((productInfo) => <SidebarCartItem productInfo={productInfo}/>)
            }
        </div>
    );
};

export default SidebarCart;