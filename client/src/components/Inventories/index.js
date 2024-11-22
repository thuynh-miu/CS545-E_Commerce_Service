import { Link, useNavigate } from "react-router-dom";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getInventories } from "../../api/seller";
import { deleteProductById } from "../../api/products";

export default function Inventories(props) {
    const [inventories, setInventories] = useState([]);

    const fetchInventories = () => {
        getInventories().then((inventories) => setInventories(inventories));
    };

    useEffect(() => {
        fetchInventories();
    }, []);

    const navigate = useNavigate();

    const handleDelete = (id) => {
        deleteProductById(id)
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error("Can not delete this product!");
                }
            })
            .catch((error) => {
                alert(error);
            })
            .finally(() => {
                fetchInventories();
            });
    };

    const handleUpdate = (id) => {
        navigate("/seller/update-inventory", {
            state: {
                id: id,
            },
        });
    };

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="h4">Inventories</h2>
                <Link to={"/seller/add-inventory"}>
                    <button className="btn btn-primary rounded-pill">
                        New Inventory
                    </button>
                </Link>
            </div>
            <div className="table-responsive">
                <table className="table table-hover align-middle">
                    <thead className="table-light">
                        <tr>
                            <th scope="col">Product</th>
                            <th scope="col">Price</th>
                            <th scope="col">Stock</th>
                            <th scope="col">Sold</th>
                            <th scope="col" className="text-center">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventories.map((inventory) => (
                            <tr key={inventory.id}>
                                <td className="d-flex align-items-center">
                                    <img
                                        src={inventory.imageUrl}
                                        alt={inventory.name}
                                        className="me-3 rounded"
                                        width={60}
                                        height={60}
                                        style={{ objectFit: "cover" }}
                                    />
                                    <span
                                        className="text-truncate"
                                        style={{ maxWidth: "150px" }}
                                    >
                                        {inventory.name}
                                    </span>
                                </td>
                                <td>
                                    ${parseFloat(inventory.price).toFixed(2)}
                                </td>
                                <td>{inventory.quantity}</td>
                                <td>{inventory.soldQuantity}</td>
                                <td className="text-center">
                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() =>
                                            handleUpdate(inventory.id)
                                        }
                                    >
                                        <EditFilled />
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() =>
                                            handleDelete(inventory.id)
                                        }
                                    >
                                        <DeleteFilled />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
