import PropTypes from 'prop-types';
import { formatCurrency } from '../../utils/helpers';

function OrderItem({ item, isLoadingIngredients, ingredients, onRemove }) {
  const { id, quantity, name, totalPrice } = item;

  return (
    <li className="order-item border-b border-gray-200 py-2">
      <div className="flex items-center justify-between">
        <div>
          <p>
            <span>{quantity}× </span>
            {name}
          </p>
          {!isLoadingIngredients && ingredients && (
            <p className="text-sm text-gray-500">{ingredients.join(', ')}</p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <p>{formatCurrency(totalPrice)}</p>

          {/* 🗑️ Remove button */}
          {onRemove && (
            <button
              onClick={() => onRemove(id)}
              className="rounded-full bg-red-500 px-2 py-1 text-xs font-semibold text-white hover:bg-red-600"
            >
              Remove
            </button>
          )}
        </div>
      </div>
    </li>
  );
}

OrderItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    totalPrice: PropTypes.number.isRequired,
  }).isRequired,
  isLoadingIngredients: PropTypes.bool,
  ingredients: PropTypes.arrayOf(PropTypes.string),
  onRemove: PropTypes.func, // ✅ optional, so you can reuse this component elsewhere
};

export default OrderItem;
