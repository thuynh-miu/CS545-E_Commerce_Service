import BestSellerProducts from "../BestSellerProducts";

export default function Home() {
  return (
    <div className="container py-4">
      <div className="text-center mb-4">
        <h1 className="h4">Welcome to Our Store</h1>
        <p className="text-muted">
          Explore our top-selling products and find what you love!
        </p>
      </div>
      <div className="bg-light p-4 rounded shadow-sm">
        <h2 className="h5 text-center mb-3">Best Seller Products</h2>
        <BestSellerProducts />
      </div>
    </div>
  );
}
