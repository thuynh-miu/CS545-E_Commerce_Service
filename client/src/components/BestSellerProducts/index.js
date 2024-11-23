import Product from "../Product";
import {useEffect, useState} from "react";
import axios from "axios";

export default function BestSellerProducts(props) {
    const [products, setProducts] = useState([])

    useEffect(() => {
        // call api/v1/products/best
        axios.get('http://localhost:8080/api/v1/products/best').then((res) => {
            setProducts(res.data.map(product=>{
                return {
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    quantity: product.quantity,
                    imageUrl: product.imageUrl,
                    reviews: product.reviews,
                    rating: product.rating
                }
            }))
        });

    }, []);

    return (
        <div className="best-seller-products">
            <h2 className="text-center mb-4">Best Seller Products</h2>
            <div className="row g-4">
                {products.map((product) => (
                    <div key={product.id} className="col-6 col-md-4 col-lg-3">
                        <div className="product-card shadow-sm">
                            <Product product={product} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
