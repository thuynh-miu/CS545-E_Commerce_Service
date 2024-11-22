import {Link} from "react-router-dom";
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
                    img_url: product.imageUrl,
                    reviews: product.reviews
                }
            }))
        });

    }, []);

    return (
        <div>
            <h2 className="mb-3">Best seller products</h2>
            <div className="d-flex flex-wrap">
                {
                    products.map(
                        product => <div className="product-overview me-4 mb-4">
                            <Product product={product}/>
                        </div>
                    )
                }
            </div>
        </div>

    )
}