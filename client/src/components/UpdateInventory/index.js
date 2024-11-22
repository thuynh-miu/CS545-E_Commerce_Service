import InventoryDetail from "../InventoryDetail";

export default function UpdateInventory(prop) {
  const inventory = {
    id: 1,
    name: "Lenovo IdeaPad Slim 3",
    price: 299.0,
    img_url:
      "https://i5.walmartimages.com/seo/Lenovo-IdeaPad-1i-15-6-Intel-Core-i5-1235U-8GB-RAM-256-GB-SSD-Abyss-Blue-Windows-11-in-S-Mode-82QD00GNUS_6208c78c-db3f-41e6-8b16-4e121f57856a.473c2139b755df36f394ea7262b7f051.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
    rating: 4.5,
    stock: 200,
    sold: 100,
    description: "Hello"
  };

  const onSave = ({name, price, img_url, stock, description}) => {

  }
  return (
    <div className="container py-4">
      <div className="text-center mb-4">
        <h1 className="h4">Update Inventory</h1>
        <p className="text-muted">Modify the details of your inventory item below</p>
      </div>
      <div className="bg-light p-4 rounded shadow-sm">
        <InventoryDetail
          name={inventory.name}
          price={inventory.price}
          stock={inventory.stock}
          description={inventory.description}
          imageUrl={inventory.img_url}
          onSave={onSave}
        />
      </div>
    </div>
  );
}
