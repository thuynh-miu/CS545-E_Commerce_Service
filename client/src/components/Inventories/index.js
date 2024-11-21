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
    <div className="container">
      <Link to={"/seller/add-inventory"}>
        <button className="btn btn-primary">New Inventory</button>
      </Link>
      <table className="table table-hover align-middle">
        <thead>
          <tr>
            <th scope="col">Product Name</th>
            <th scope="col">Price</th>
            <th scope="col">Stock</th>
            <th scope="col">Sold</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {inventories.map((inventory) => (
            <tr>
              <td>
                <img
                  className="me-2"
                  src={inventory.img_url}
                  width={60}
                  height={60}
                />
                {inventory.name}
              </td>
              <td>{parseFloat(inventory.price).toFixed(2)}</td>
              <td>{inventory.stock}</td>
              <td>{inventory.sold}</td>
              <td>
                <div>
                  <button className="btn btn-warning me-2" onClick={handleUpdate.bind(this, inventory.id)}>
                    <EditFilled />
                  </button>
                  <button className="btn btn-danger" onClick={handleDelete.bind(this, inventory.id)}>
                    <DeleteFilled />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
