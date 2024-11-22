import { Link, useNavigate } from "react-router-dom";
import { DeleteFilled, EditFilled } from "@ant-design/icons";

export default function Inventories(props) {
  const inventories = [
    {
      id: 1,
      name: "Lenovo IdeaPad Slim 3",
      price: 299.0,
      img_url:
        "https://i5.walmartimages.com/seo/Lenovo-IdeaPad-1i-15-6-Intel-Core-i5-1235U-8GB-RAM-256-GB-SSD-Abyss-Blue-Windows-11-in-S-Mode-82QD00GNUS_6208c78c-db3f-41e6-8b16-4e121f57856a.473c2139b755df36f394ea7262b7f051.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
      rating: 4.5,
      stock: 200,
      sold: 100,
    },
    {
      id: 2,
      name: "Lenovo IdeaPad Slim 3",
      price: 299.0,
      img_url:
        "https://i5.walmartimages.com/seo/Lenovo-IdeaPad-1i-15-6-Intel-Core-i5-1235U-8GB-RAM-256-GB-SSD-Abyss-Blue-Windows-11-in-S-Mode-82QD00GNUS_6208c78c-db3f-41e6-8b16-4e121f57856a.473c2139b755df36f394ea7262b7f051.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
      rating: 4.5,
      stock: 200,
      sold: 100,
    },
    {
      id: 3,
      name: "Lenovo IdeaPad Slim 3",
      price: 299.0,
      img_url:
        "https://i5.walmartimages.com/seo/Lenovo-IdeaPad-1i-15-6-Intel-Core-i5-1235U-8GB-RAM-256-GB-SSD-Abyss-Blue-Windows-11-in-S-Mode-82QD00GNUS_6208c78c-db3f-41e6-8b16-4e121f57856a.473c2139b755df36f394ea7262b7f051.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
      rating: 4.5,
      stock: 200,
      sold: 100,
    },
    {
      id: 4,
      name: "Lenovo IdeaPad Slim 3",
      price: 299.0,
      img_url:
        "https://i5.walmartimages.com/seo/Lenovo-IdeaPad-1i-15-6-Intel-Core-i5-1235U-8GB-RAM-256-GB-SSD-Abyss-Blue-Windows-11-in-S-Mode-82QD00GNUS_6208c78c-db3f-41e6-8b16-4e121f57856a.473c2139b755df36f394ea7262b7f051.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
      rating: 4.5,
      stock: 200,
      sold: 100,
    },
    {
      id: 5,
      name: "Lenovo IdeaPad Slim 3",
      price: 299.0,
      img_url:
        "https://i5.walmartimages.com/seo/Lenovo-IdeaPad-1i-15-6-Intel-Core-i5-1235U-8GB-RAM-256-GB-SSD-Abyss-Blue-Windows-11-in-S-Mode-82QD00GNUS_6208c78c-db3f-41e6-8b16-4e121f57856a.473c2139b755df36f394ea7262b7f051.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
      rating: 4.5,
      stock: 200,
      sold: 100,
    },
    {
      id: 6,
      name: "Lenovo IdeaPad Slim 3",
      price: 299.0,
      img_url:
        "https://i5.walmartimages.com/seo/Lenovo-IdeaPad-1i-15-6-Intel-Core-i5-1235U-8GB-RAM-256-GB-SSD-Abyss-Blue-Windows-11-in-S-Mode-82QD00GNUS_6208c78c-db3f-41e6-8b16-4e121f57856a.473c2139b755df36f394ea7262b7f051.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
      rating: 4.5,
      stock: 200,
      sold: 100,
    },
    {
      id: 7,
      name: "Lenovo IdeaPad Slim 3",
      price: 299.0,
      img_url:
        "https://i5.walmartimages.com/seo/Lenovo-IdeaPad-1i-15-6-Intel-Core-i5-1235U-8GB-RAM-256-GB-SSD-Abyss-Blue-Windows-11-in-S-Mode-82QD00GNUS_6208c78c-db3f-41e6-8b16-4e121f57856a.473c2139b755df36f394ea7262b7f051.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
      rating: 4.5,
      stock: 200,
      sold: 100,
    },
    {
      id: 8,
      name: "Lenovo IdeaPad Slim 3",
      price: 299.0,
      img_url:
        "https://i5.walmartimages.com/seo/Lenovo-IdeaPad-1i-15-6-Intel-Core-i5-1235U-8GB-RAM-256-GB-SSD-Abyss-Blue-Windows-11-in-S-Mode-82QD00GNUS_6208c78c-db3f-41e6-8b16-4e121f57856a.473c2139b755df36f394ea7262b7f051.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
      rating: 4.5,
      stock: 200,
      sold: 100,
    },
    {
      id: 9,
      name: "Lenovo IdeaPad Slim 3",
      price: 299.0,
      img_url:
        "https://i5.walmartimages.com/seo/Lenovo-IdeaPad-1i-15-6-Intel-Core-i5-1235U-8GB-RAM-256-GB-SSD-Abyss-Blue-Windows-11-in-S-Mode-82QD00GNUS_6208c78c-db3f-41e6-8b16-4e121f57856a.473c2139b755df36f394ea7262b7f051.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
      rating: 4.5,
      stock: 200,
      sold: 100,
    },
    {
      id: 10,
      name: "Lenovo IdeaPad Slim 3",
      price: 299.0,
      img_url:
        "https://i5.walmartimages.com/seo/Lenovo-IdeaPad-1i-15-6-Intel-Core-i5-1235U-8GB-RAM-256-GB-SSD-Abyss-Blue-Windows-11-in-S-Mode-82QD00GNUS_6208c78c-db3f-41e6-8b16-4e121f57856a.473c2139b755df36f394ea7262b7f051.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
      rating: 4.5,
      stock: 200,
      sold: 100,
    },
  ];

  const navigate = useNavigate();

  const handleDelete = (id) => {
    console.log("deleting id");
  };

  const handleUpdate = (id) => {
    console.log(id)
    navigate('/seller/update-inventory', {
      state: {
        id: id
      }
    })
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h4">Inventories</h2>
        <Link to={"/seller/add-inventory"}>
          <button className="btn btn-primary rounded-pill">New Inventory</button>
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
                    src={inventory.img_url}
                    alt={inventory.name}
                    className="me-3 rounded"
                    width={60}
                    height={60}
                    style={{ objectFit: "cover" }}
                  />
                  <span className="text-truncate" style={{ maxWidth: "150px" }}>
                    {inventory.name}
                  </span>
                </td>
                <td>${parseFloat(inventory.price).toFixed(2)}</td>
                <td>{inventory.stock}</td>
                <td>{inventory.sold}</td>
                <td className="text-center">
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleUpdate(inventory.id)}
                  >
                    <EditFilled />
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(inventory.id)}
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
