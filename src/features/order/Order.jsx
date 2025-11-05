import PropTypes from 'prop-types';

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  return (
    <li className="flex justify-between py-2 border-b border-stone-200">
      <div>
        <p>
          {item.quantity}× {item.name}
        </p>
        <p className="text-sm text-stone-500">
          {isLoadingIngredients
            ? 'Loading ingredients...'
            : ingredients?.join(', ')}
        </p>
      </div>
      <p className="text-sm font-medium">{item.totalPrice}</p>
    </li>
  );
}

// ✅ Fix ESLint prop-type warnings
OrderItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    quantity: PropTypes.number,
    totalPrice: PropTypes.number,
  }).isRequired,
  isLoadingIngredients: PropTypes.bool,
  ingredients: PropTypes.arrayOf(PropTypes.string),
};

export default OrderItem;
