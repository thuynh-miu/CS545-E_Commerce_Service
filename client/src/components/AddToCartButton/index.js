import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useUserContext } from "../../contexts/UserContextProvider";
import { UserRole } from "../../constants/UserRole/index";

export default function AddToCartButton({ quantity, increase, decrease }) {
  const { userData } = useUserContext();
  if (userData.role === UserRole.ADMIN || userData.role === UserRole.SELLER) {
    return null;
  }
  return (
    <div className="quantity-selector w-100 p-2">
      {quantity === 0 ? (
        <div className="d-flex cursor-pointer">
          <span className="w-100 text-center" onClick={increase}>
            Add To Cart
          </span>
        </div>
      ) : (
        <div className="d-flex">
          <MinusOutlined
            className="decrease-quantity-button px-3"
            onClick={decrease}
          />
          <div className="m-auto">{quantity}</div>
          <PlusOutlined
            className="increase-quantity-button px-3"
            onClick={increase}
          />
        </div>
      )}
    </div>
  );
}
