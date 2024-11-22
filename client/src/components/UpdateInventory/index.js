import { useLocation, useNavigate } from "react-router-dom";
import InventoryDetail from "../InventoryDetail";
import { useEffect, useState } from "react";
import { getProductById } from "../../api";
import { updateProductById } from "../../api/products";

export default function UpdateInventory(prop) {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = location.state;

    const [inventory, setInventory] = useState({});
    useEffect(() => {
        getProductById(id).then((inventory) => {
            setInventory(inventory);
        });
    }, []);

    const onSave = ({ name, price, imageUrl, quantity, description }) => {
        updateProductById(id, {
            name: name,
            price: price,
            imageUrl: imageUrl,
            quantity: quantity,
            description: description,
        }).then((response) => {
          navigate(-1);
        });
    };
    return (
        <div className="container py-4">
            <div className="text-center mb-4">
                <h1 className="h4">Update Inventory</h1>
                <p className="text-muted">
                    Modify the details of your inventory item below
                </p>
            </div>
            <div className="bg-light p-4 rounded shadow-sm">
                <InventoryDetail
                    name={inventory.name}
                    price={inventory.price}
                    quantity={inventory.quantity}
                    description={inventory.description}
                    imageUrl={inventory.imageUrl}
                    onSave={onSave}
                />
            </div>
        </div>
    );
}
