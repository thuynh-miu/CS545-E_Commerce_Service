import InventoryDetail from "../InventoryDetail";

export default function AddNewInventory(prop) {

  const onSave = ({name, price, img_url, stock, description}) => {

  }
  return (
    <div className="container py-4">
      <div className="text-center mb-4">
        <h1 className="h4">Add New Inventory</h1>
        <p className="text-muted">Fill in the details below to add a new inventory item</p>
      </div>
      <div className="bg-light p-4 rounded shadow-sm">
        <InventoryDetail onSave={onSave} />
      </div>
    </div>
  );
}
