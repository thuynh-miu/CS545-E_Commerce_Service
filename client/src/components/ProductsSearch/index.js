import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Product from "../Product";
import Pagination from "../Pagination";
import { useEffect, useState } from "react";
import ProductsFilters from "../ProductsFilters";
import { getProducts } from "../../api";

export default function ProductsSearch(props) {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const currentPage = parseInt(searchParams.get("page"));

    const [products, setProducts] = useState([]);
    useEffect(() => {
        getProducts().then((products) => setProducts(products));
    }, [searchParams]);

    const goToPage = (pageIndex) => {
        searchParams.set("page", pageIndex);
        setSearchParams(searchParams);
    };

    useEffect(() => {
        navigate(`?${searchParams.toString()}`);
    }, [searchParams]);

    return (
        <div className="container w-100">
            <h2 className="text-center">
                Search results for {searchParams.get("q")}{" "}
            </h2>
            <div className="d-flex w-100">
                <div className="me-5 sticky-top" style={{ width: "500px" }}>
                    <ProductsFilters />
                </div>
                <div className="d-flex flex-column">
                    <div className="d-flex flex-wrap">
                        {products.map((product) => (
                            <div className="product-overview me-4 mb-4">
                                <Product product={product} />
                            </div>
                        ))}
                    </div>
                    <div>
                        <Pagination
                            current={currentPage}
                            maximum={10}
                            onSelectPage={goToPage}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
