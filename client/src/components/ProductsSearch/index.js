import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import Product from "../Product";
import Pagination from "../Pagination";
import { useEffect } from "react";
import ProductsFilters from "../ProductsFilters";


export default function ProductsSearch(props) {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const currentPage = parseInt(searchParams.get('page'));

    const products = [
        {
            id: 1,
            name: "Lenovo IdeaPad Slim 3",
            price: 299.0,
            img_url: "https://i5.walmartimages.com/seo/Lenovo-IdeaPad-1i-15-6-Intel-Core-i5-1235U-8GB-RAM-256-GB-SSD-Abyss-Blue-Windows-11-in-S-Mode-82QD00GNUS_6208c78c-db3f-41e6-8b16-4e121f57856a.473c2139b755df36f394ea7262b7f051.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            rating: 4.5
        },
        {
            id: 2,
            name: "Lenovo IdeaPad Slim 3",
            price: 299.0,
            img_url: "https://i5.walmartimages.com/seo/Lenovo-IdeaPad-1i-15-6-Intel-Core-i5-1235U-8GB-RAM-256-GB-SSD-Abyss-Blue-Windows-11-in-S-Mode-82QD00GNUS_6208c78c-db3f-41e6-8b16-4e121f57856a.473c2139b755df36f394ea7262b7f051.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            rating: 4.5
        },
        {
            id: 3,
            name: "Lenovo IdeaPad Slim 3",
            price: 299.0,
            img_url: "https://i5.walmartimages.com/seo/Lenovo-IdeaPad-1i-15-6-Intel-Core-i5-1235U-8GB-RAM-256-GB-SSD-Abyss-Blue-Windows-11-in-S-Mode-82QD00GNUS_6208c78c-db3f-41e6-8b16-4e121f57856a.473c2139b755df36f394ea7262b7f051.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            rating: 4.5
        },
        {
            id: 4,
            name: "Lenovo IdeaPad Slim 3",
            price: 299.0,
            img_url: "https://i5.walmartimages.com/seo/Lenovo-IdeaPad-1i-15-6-Intel-Core-i5-1235U-8GB-RAM-256-GB-SSD-Abyss-Blue-Windows-11-in-S-Mode-82QD00GNUS_6208c78c-db3f-41e6-8b16-4e121f57856a.473c2139b755df36f394ea7262b7f051.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            rating: 4.5
        },
        {
            id: 5,
            name: "Lenovo IdeaPad Slim 3",
            price: 299.0,
            img_url: "https://i5.walmartimages.com/seo/Lenovo-IdeaPad-1i-15-6-Intel-Core-i5-1235U-8GB-RAM-256-GB-SSD-Abyss-Blue-Windows-11-in-S-Mode-82QD00GNUS_6208c78c-db3f-41e6-8b16-4e121f57856a.473c2139b755df36f394ea7262b7f051.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            rating: 4.5
        },
        {
            id: 6,
            name: "Lenovo IdeaPad Slim 3",
            price: 299.0,
            img_url: "https://i5.walmartimages.com/seo/Lenovo-IdeaPad-1i-15-6-Intel-Core-i5-1235U-8GB-RAM-256-GB-SSD-Abyss-Blue-Windows-11-in-S-Mode-82QD00GNUS_6208c78c-db3f-41e6-8b16-4e121f57856a.473c2139b755df36f394ea7262b7f051.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            rating: 4.5
        },
        {
            id: 7,
            name: "Lenovo IdeaPad Slim 3",
            price: 299.0,
            img_url: "https://i5.walmartimages.com/seo/Lenovo-IdeaPad-1i-15-6-Intel-Core-i5-1235U-8GB-RAM-256-GB-SSD-Abyss-Blue-Windows-11-in-S-Mode-82QD00GNUS_6208c78c-db3f-41e6-8b16-4e121f57856a.473c2139b755df36f394ea7262b7f051.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            rating: 4.5
        },
        {
            id: 8,
            name: "Lenovo IdeaPad Slim 3",
            price: 299.0,
            img_url: "https://i5.walmartimages.com/seo/Lenovo-IdeaPad-1i-15-6-Intel-Core-i5-1235U-8GB-RAM-256-GB-SSD-Abyss-Blue-Windows-11-in-S-Mode-82QD00GNUS_6208c78c-db3f-41e6-8b16-4e121f57856a.473c2139b755df36f394ea7262b7f051.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            rating: 4.5
        },
        {
            id: 9,
            name: "Lenovo IdeaPad Slim 3",
            price: 299.0,
            img_url: "https://i5.walmartimages.com/seo/Lenovo-IdeaPad-1i-15-6-Intel-Core-i5-1235U-8GB-RAM-256-GB-SSD-Abyss-Blue-Windows-11-in-S-Mode-82QD00GNUS_6208c78c-db3f-41e6-8b16-4e121f57856a.473c2139b755df36f394ea7262b7f051.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            rating: 4.5
        },
        {
            id: 10,
            name: "Lenovo IdeaPad Slim 3",
            price: 299.0,
            img_url: "https://i5.walmartimages.com/seo/Lenovo-IdeaPad-1i-15-6-Intel-Core-i5-1235U-8GB-RAM-256-GB-SSD-Abyss-Blue-Windows-11-in-S-Mode-82QD00GNUS_6208c78c-db3f-41e6-8b16-4e121f57856a.473c2139b755df36f394ea7262b7f051.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            rating: 4.5
        },
    ];

    const goToPage = (pageIndex) => {
        searchParams.set('page', pageIndex);
        setSearchParams(searchParams);
    }

    useEffect(
        () => {
            navigate(`?${searchParams.toString()}`)
        }, [searchParams]
    )

    return (
        <div className="container">
            <h2 className="text-center mt-4">Search results for "{searchParams.get("q")}"</h2>
            <div className="row">
                {/* Sidebar filters */}
                <div className="col-12 col-md-3 mb-4">
                    <div className="sticky-top">
                        <ProductsFilters />
                    </div>
                </div>
                {/* Products and Pagination */}
                <div className="col-12 col-md-9">
                    <div className="row g-4">
                        {products.map((product) => (
                            <div key={product.id} className="col-6 col-sm-6 col-md-4 col-lg-3">
                                <Product product={product} />
                            </div>
                        ))}
                    </div>
                    <div className="d-flex justify-content-center mt-4">
                        <Pagination
                            current={currentPage}
                            maximum={10}
                            onSelectPage={goToPage}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}