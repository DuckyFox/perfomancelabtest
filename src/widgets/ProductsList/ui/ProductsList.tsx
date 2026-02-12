import ProductCard from "@/widgets/ProductCard/ui/ProductCard.tsx";
import type {IProductType} from "@/entities/ProductCard";

interface ProductsListProps {
    data: IProductType[]
}

const ProductsList = (props: ProductsListProps) => {

    const {data} = props

    return (
        <section className={`ml-auto mr-auto max-w-7xl grid grid-cols-5 gap-5`}>
                {
                    data.map((product:IProductType)=>(
                        <ProductCard key={product.id} productData={product}/>
                    ))
                }
        </section>
    );
};

export default ProductsList;