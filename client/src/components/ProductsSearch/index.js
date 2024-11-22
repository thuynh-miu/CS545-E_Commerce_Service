import { useNavigate, useSearchParams } from "react-router-dom";
import Product from "../Product";
import Pagination from "../Pagination";
import { useEffect, useState } from "react";
import ProductsFilters from "../ProductsFilters";
import { getProducts } from "../../api";

export default function ProductsSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const currentPage = parseInt(searchParams.get("page")) || 0;
  const keyword = searchParams.get("q") || "";
  const queryParams = Object.fromEntries(
    [...searchParams.entries()].map(([key, value]) => [key, decodeURIComponent(value)])
  );

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getProducts({ ...queryParams, page: currentPage })
      .then((products) => setProducts(products))
      .finally(() => setLoading(false));
  }, [searchParams]);

  const goToPage = (pageIndex) => {
    searchParams.set("page", pageIndex-1);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    navigate(`?${searchParams.toString()}`);
  }, [searchParams]);
  return (
    <div className="container w-100 py-4">
      <h2 className="text-center mb-4">
        {keyword ? `Search results for "${keyword}"` : "All Products"}
      </h2>
      <div className="row">
        <div className="col-12 col-md-3 mb-4">
          <ProductsFilters />
        </div>
        <div className="col-12 col-md-9">
          {loading ? (
            <p className="text-center">Loading products...</p>
          ) : (
            <>
              <div className="row">
                {products?.content?.length > 0 ? (
                  products.content.map((product) => (
                    <div
                      className="col-6 col-sm-6 col-md-4 mb-4"
                      key={product.id}
                    >
                      <Product product={product} />
                    </div>
                  ))
                ) : (
                  <p className="text-center">No products found.</p>
                )}
              </div>
              <div className="d-flex justify-content-center mt-4">
                <Pagination
                  current={currentPage}
                  maximum={products.totalPages+1}
                  onSelectPage={goToPage}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

