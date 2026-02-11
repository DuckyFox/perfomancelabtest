import axios from "axios";
import type {ImportMetaEnv} from "@/vite-env";
import type {IFilterParams} from "../model";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const MetaEnv = import.meta.env as ImportMetaEnv

const getProducts = async (filters: IFilterParams) => {

    const response = await axios.get(`${MetaEnv.VITE_API_URL}/products`, {
        params: {
            _page: filters?.page,
            _per_page: filters?.perPage,
        }
    })

    const totalCount = response.data.items

    const pagesAmount = Math.ceil(totalCount / filters.perPage)

    return {
        data: response.data.data,
        totalCount,
        pagesAmount
    }
}

export default getProducts
