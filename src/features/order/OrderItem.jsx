import { formatCurrency } from "../../utils/helpers";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="order-item">
      <div className="flex justify-between items-center">
        <p>
          <span>{quantity}× </span>
          {name}
        </p>
        <p>{formatCurrency(totalPrice)}</p>
      </div>

      {/* Optional: show ingredients once loaded */}
      {!isLoadingIngredients && ingredients && (
        <p className="text-sm text-gray-500">{ingredients.join(", ")}</p>
      )}
    </li>
  );
}

export default OrderItem;
