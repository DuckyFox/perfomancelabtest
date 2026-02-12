import type {IFilterParams} from "@/shared/model";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/shared/ui/pagination"

interface PaginatorProps {
    paginationParams: IFilterParams,
    setNewPage: (newPage: number) => void,
    pagesAmount: number,
}

const Paginator = (props: PaginatorProps) => {

    const {paginationParams, setNewPage, pagesAmount} = props

    function prevPageHandle(curPage: number) {
        if (curPage > 1) setNewPage(curPage - 1)
    }

    function nextPageHandle(curPage: number) {
        console.log(pagesAmount)
        if (curPage < pagesAmount) setNewPage(curPage + 1)
    }

    function pageClickHandle(newPage: number) {
        setNewPage(newPage)
    }

    return (
        <Pagination>
            <PaginationContent>

                <PaginationItem>
                    <PaginationPrevious
                        className={`cursor-pointer`}
                        isActive={paginationParams.page > 1}
                        onClick={()=>{
                            prevPageHandle(paginationParams.page)
                        }}
                    />
                </PaginationItem>
                {
                    paginationParams.page > 2
                        ? (
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )
                        : <></>
                }
                <PaginationItem>
                    {
                        paginationParams.page > 1
                            ? (
                                <PaginationLink
                                    className={`cursor-pointer`}
                                    onClick={()=>pageClickHandle(paginationParams.page - 1)}
                                >
                                    {paginationParams.page - 1}
                                </PaginationLink>
                            )
                            : <></>
                    }
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink className={`cursor-pointer`} isActive>
                        {paginationParams.page}
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    {
                        paginationParams.page < pagesAmount
                            ? (
                                <PaginationLink
                                    className={`cursor-pointer`}
                                    onClick={()=>pageClickHandle(paginationParams.page + 1)}
                                >
                                    {paginationParams.page + 1}
                                </PaginationLink>
                            )
                            : <></>
                    }
                </PaginationItem>
                {
                    paginationParams.page <= pagesAmount - 2
                        ? (
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )
                        : <></>
                }
                <PaginationItem>
                    <PaginationNext
                        className={`cursor-pointer`}
                        isActive={paginationParams.page < pagesAmount}
                        onClick={()=>{
                            nextPageHandle(paginationParams.page)
                        }}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default Paginator;