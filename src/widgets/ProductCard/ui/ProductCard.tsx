import type {IProductType} from "@/entities/ProductCard";
import {AddToCartBtn} from "@/features/AddToCartBtn";

interface ProductCardWithActionsProps {
    productData: IProductType
}

const ProductCard = (props:ProductCardWithActionsProps) => {

    const { productData } = props

    return (
        <div className={`flex flex-col`}>
            <div className={`relative aspect-square overflow-hidden rounded-xl bg-muted cursor-pointer`}>
                <img
                    className={`w-full h-full object-cover hover:scale-105 transition-transform duration-300`}
                    src={productData.image}
                    alt={productData.name}
                />
            </div>
            <h4 className={`text-muted-foreground text-sm font-semibold`}>
                {productData.category}
            </h4>
            <h3 aria-label={productData.name} className={`text-foreground text-lg font-semibold line-clamp-2 min-h-[2rem]`}>
                {productData.name}
            </h3>
            <h4 aria-label={productData.description} className={`text-muted-foreground text-sm line-clamp-2 min-h-[1.5rem]`}>
                {productData.description}
            </h4>
            <div className="flex items-center justify-between mt-auto pt-2">
                <h2 className="text-foreground text-xl font-bold">
                    {Math.floor(productData.price)} ₽
                </h2>
                <AddToCartBtn />
            </div>
        </div>
    );
};

export default ProductCard;