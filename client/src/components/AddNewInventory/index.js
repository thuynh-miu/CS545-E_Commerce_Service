import InventoryDetail from "../InventoryDetail";
import { createProduct } from "../../api/products";
import { useNavigate } from "react-router-dom";

export default function AddNewInventory(prop) {
    const navigate = useNavigate();
    const onSave = ({ name, price, imageUrl, quantity, description }) => {
        createProduct({
            name: name,
            price: price,
            imageUrl: imageUrl,
            quantity: quantity,
            description: description,
        })
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error("Can not save product");
                }
                navigate(-1);
            })
            .catch((error) => {
                alert(error);
            });
    };
    return (
        <div className="container py-4">
            <div className="text-center mb-4">
                <h1 className="h4">Add New Inventory</h1>
                <p className="text-muted">
                    Fill in the details below to add a new inventory item
                </p>
            </div>
            <div className="bg-light p-4 rounded shadow-sm">
                <InventoryDetail onSave={onSave} />
            </div>
        </div>
    );
}
