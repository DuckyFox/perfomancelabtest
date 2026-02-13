import type { IProductType } from "@/entities/ProductCard";

export interface ICartItem {
    amount: number;
    product: IProductType;
}
