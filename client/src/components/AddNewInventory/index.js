import InventoryDetail from "../InventoryDetail";

export default function AddNewInventory(prop) {

  const onSave = ({name, price, img_url, stock, description}) => {

  }
  return (
    <div className="container">
      <InventoryDetail
        onSave={onSave}
      />
    </div>
  );
}
