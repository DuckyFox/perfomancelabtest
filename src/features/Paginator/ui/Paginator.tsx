import React from "react";
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
    setPaginationParams: React.Dispatch<React.SetStateAction<IFilterParams>>,
    pagesAmount: number,
}

const Paginator = (props: PaginatorProps) => {

    const {paginationParams, setPaginationParams, pagesAmount} = props

    function prevPageHandle(curPage: number) {
        if (curPage > 1) setPaginationParams((prev)=> ({
            ...prev,
            page: curPage - 1
        }))
    }

    function nextPageHandle(curPage: number) {
        console.log(pagesAmount)
        if (curPage < pagesAmount) setPaginationParams((prev)=> ({
            ...prev,
            page: curPage + 1
        }))
    }

    function pageClickHandle(newPage: number) {
        setPaginationParams((prev)=> ({
            ...prev,
            page: newPage
        }))
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