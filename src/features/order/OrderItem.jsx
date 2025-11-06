import PropTypes from 'prop-types';
import { formatCurrency } from '../../utils/helpers';

function OrderItem({ item, isLoadingIngredients, ingredients, onRemove }) {
  // ✅ Fix: use pizzaId instead of id
  const { pizzaId, quantity, name, totalPrice } = item;
  const id = pizzaId;

  return (
    <li className="order-item border-b border-gray-200 py-2">
      <div className="flex items-center justify-between">
        <div>
          <p>
            <span>{quantity}× </span>
            {name}
          </p>

          {/* ✅ Show ingredients only when loaded */}
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

      {/* ✅ Safe ingredient rendering (no crash if undefined) */}
      <p className="text-sm capitalize italic text-stone-500">
        {isLoadingIngredients
          ? 'Loading...'
          : ingredients?.join(', ') || ''}
      </p>
    </li>
  );
}

OrderItem.propTypes = {
  item: PropTypes.shape({
    pizzaId: PropTypes.number.isRequired, // ✅ corrected
    quantity: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    totalPrice: PropTypes.number.isRequired,
  }).isRequired,
  isLoadingIngredients: PropTypes.bool,
  ingredients: PropTypes.arrayOf(PropTypes.string),
  onRemove: PropTypes.func,
};

export default OrderItem;
