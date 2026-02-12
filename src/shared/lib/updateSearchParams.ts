import type {QueryParams} from "@/shared/model";
import type {SetURLSearchParams} from "react-router";

export function updateSearchParams(updates: QueryParams, curParams: URLSearchParams, setParams: SetURLSearchParams) {
    const newParams = new URLSearchParams(curParams)
    Object.entries(updates).forEach(([key, value])=> {
        if (value === undefined || value === '') {
            newParams.delete(key)
        } else {
            newParams.set(key, String(value))
        }
    })
    setParams(newParams)
}