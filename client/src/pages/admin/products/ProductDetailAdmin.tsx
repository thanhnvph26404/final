import { useParams } from "react-router-dom";
import { useGetProductQuery } from "../../../store/products/product.services";

const ProductDetailAdmin = () => {
    const { id } = useParams();
    const { data: product, error, isLoading } = useGetProductQuery( id! );
    console.log(product);

    return (
        <div>
            <h1>Product Detail Page</h1>
        </div>
    )
}

export default ProductDetailAdmin