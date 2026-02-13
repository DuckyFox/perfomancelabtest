import type { Category } from "@/features/CategoryFilter/types/CategoryModel.ts";

export interface IFilterParams {
    page: number;
    perPage: number;
    category?: Category;
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
}
