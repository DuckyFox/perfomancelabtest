import axios from "axios";
import type {ImportMetaEnv} from "@/vite-env";
import type {IFilterParams, QueryParams} from "../model";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const MetaEnv = import.meta.env as ImportMetaEnv

const getProducts = async (filters: IFilterParams) => {

    const params: QueryParams = {
        _page: filters.page,
        _per_page: filters.perPage,
    }

    if (filters.category) params.category = filters.category
    if (filters.minPrice) params.price_gte = filters.minPrice
    if (filters.maxPrice) params.price_lte = filters.maxPrice
    if (filters.sort) params._sort = filters.sort

    const response = await axios.get(`${MetaEnv.VITE_API_URL}/products`, {
        params
    })
    console.log(response)
    const totalCount = response.data.items

    const pagesAmount = Math.ceil(totalCount / Number(filters.perPage))

    return {
        data: response.data.data,
        totalCount,
        pagesAmount
    }
}

export default getProducts
