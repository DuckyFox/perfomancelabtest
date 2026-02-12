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
import {SidebarCart} from "@/widgets/SidebarCart";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/shared/ui/sheet"
import {Button} from "@/shared/ui";
import {ShoppingCart} from "lucide-react";
import {useAppSelector} from "@/shared/hooks";
import {selectCart} from "@/entities/SidebarCartSlice/model/sidebarCartSlice.ts";

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
    const cart = useAppSelector(selectCart)
    const cartItemsCount = cart.reduce((sum, item) => sum + item.amount, 0)

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
            <Sheet>
                <SheetContent
                    side={"right"}
                    className="data-[side=bottom]:max-h-[50vh] data-[side=top]:max-h-[50vh]"
                >
                    <SheetHeader>
                        <SheetTitle>Ваша корзина</SheetTitle>
                    </SheetHeader>
                    <SidebarCart/>
                </SheetContent>
                <div className={`flex flex-col gap-y-8 mt-8`}>
                    <div className={`flex items-center gap-4 mb-6 self-center`}>
                        {/*У Json server, к сожалению, нет квери параметра для поиска в духе _like, поэтому это останется для красоты*/}
                        <ProductSearch/>
                        <SortBtn setNewSort={setNewSort}/>
                        <SheetTrigger asChild>
                            <Button variant="outline" className={`border-amber-600 border-2 cursor-pointer relative`}>
                                Корзина
                                <ShoppingCart />
                                {cartItemsCount > 0 && (
                                    <span className={`absolute -top-2 -right-2 bg-amber-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center`}>
                                    {cartItemsCount > 99 ? '99+' : cartItemsCount}
                                </span>
                                )}
                            </Button>
                        </SheetTrigger>
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
            </Sheet>
        </div>
    );
};

export default Products;