import {useQuery, queryOptions} from "@tanstack/react-query";
import {getProducts} from "@/shared/api";
import ProductCard from "@/widgets/ProductCard/ui/ProductCard.tsx";
import type {IProductType} from "@/entities/ProductCard";
import type {IFilterParams} from "@/shared/model";
import {useState} from "react";
import {Paginator} from "@/features/Paginator";

const productsQueryOptions = (filters: IFilterParams) =>
    queryOptions({
        queryKey: ['products', filters.page, filters.perPage],
        queryFn: () => getProducts(filters),
    })

const ProductsList = () => {

    const [paginationParams, setPaginationParams] = useState<IFilterParams>({
        page: 1,
        perPage: 20,
    })

    const { data, isLoading, error } = useQuery(productsQueryOptions(paginationParams))

    if (isLoading) {
        return <div>Загрузка...</div>
    }

    if (error) {
        return <div>Ошибка: {error.message}</div>
    }

    if (!data || !data.data || data.data.length === 0) {
        return <div>Товары не найдены</div>
    }

    return (
        <section className={`flex flex-col gap-y-8 mt-8`}>
            <Paginator
                pagesAmount={data.pagesAmount}
                paginationParams={paginationParams}
                setPaginationParams={setPaginationParams}
            />
            <div className={`ml-auto mr-auto max-w-7xl grid grid-cols-5 gap-5`}>
                {
                    data.data.map((product:IProductType)=>(
                        <ProductCard key={product.id} productData={product}/>
                    ))
                }
            </div>
            <Paginator
                pagesAmount={data.pagesAmount}
                paginationParams={paginationParams}
                setPaginationParams={setPaginationParams}
            />
        </section>
    );
};

export default ProductsList;