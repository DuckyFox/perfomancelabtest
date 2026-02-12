import {ProductsList} from "@/widgets/ProductsList";
import type {IFilterParams} from "@/shared/model";
import {queryOptions, useQuery} from "@tanstack/react-query";
import {getProducts} from "@/shared/api";
import {useSearchParams} from "react-router";
import {useEffect} from "react";
import {ProductSearch} from "@/features/ProductSearch";
import {Paginator} from "@/features/Paginator";
import {Filters} from "@/widgets/Filters";
import {updateSearchParams} from "@/shared/lib";
import {SortBtn} from "@/features/SortBtn";

const productsQueryOptions = (filters: IFilterParams) =>
    queryOptions({
        queryKey: ['products', filters.page, filters.perPage, filters.category, filters.sort],
        queryFn: () => getProducts(filters),
    })

const Products = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const page = Number(searchParams.get('page')) || 1
    const perPage = Number(searchParams.get('perPage')) || 20
    const category = searchParams.get('category') || ''
    const sort = searchParams.get('sort') || ''


    const { data, isLoading, error } = useQuery(productsQueryOptions({page, perPage, category, sort}))

    function setNewPage(newPage: number) {
        updateSearchParams({perPage: String(perPage), page: String(newPage)}, searchParams, setSearchParams)
    }

    function setNewCategory(newCategory: string) {
        updateSearchParams({category: newCategory, page: 1}, searchParams, setSearchParams)
    }

    function setNewSort(newSort: string) {
        updateSearchParams({sort: newSort}, searchParams, setSearchParams)
    }

    useEffect(() => {
        if (!searchParams.get('page') || !searchParams.get('perPage')) {
            setSearchParams({'page': '1', 'perPage': '20'}, {replace: true})
        }
    }, [])

    const paginationParams = {
        page,
        perPage
    }

    if (isLoading) {
        return <div>Загрузка...</div>
    }

    return (
        <div >
            <Filters currentCategory={category} setNewCategory={setNewCategory}/>
            <div className={`flex flex-col gap-y-8 mt-8`}>

                <div className={`flex items-center gap-4 mb-6 self-center`}>
                    {/*У Json server, к сожалению, нет квери параметра для поиска в духе _like, поэтому это останется для красоты*/}
                    <ProductSearch/>
                    <SortBtn setNewSort={setNewSort}/>
                </div>
                {
                    isLoading ? <div>Загрузка...</div> : <></>
                }
                {isLoading && <div>Загрузка...</div>}

                {error && <div>Ошибка: {error.message}</div>}

                {!isLoading && !error && (!data || !data.data || data.data.length === 0) && (
                    <div>Товары не найдены</div>
                )}

                {!isLoading && !error && data?.data && data.data.length > 0 && (
                    <>
                        <Paginator
                            pagesAmount={data.pagesAmount}
                            paginationParams={paginationParams}
                            setNewPage={setNewPage}
                        />
                        <ProductsList
                            data={data.data}
                        />
                        <Paginator
                            pagesAmount={data.pagesAmount}
                            paginationParams={paginationParams}
                            setNewPage={setNewPage}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default Products;