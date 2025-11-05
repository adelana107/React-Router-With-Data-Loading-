import PropTypes from 'prop-types';
import Button from '../ui/Button';
import { useDispatch } from 'react-redux';
import { addItem } from '../cart/cartSlice';

function MenuItem({ pizza }) {
  const dispatch = useDispatch();
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name: name,
      quantity: 1,
      unitPrice: unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem));
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`}
      />

      <div className="flex grow flex-col pt-0.5">
        <h3 className="font-medium">{name}</h3>

        <p className="text-sm capitalize text-stone-500">
          {ingredients.join(', ')}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <span>{soldOut ? 'Sold Out' : `${unitPrice} USD`}</span>

          {!soldOut ? (
            <Button type="small" onClick={handleAddToCart}>
              Add to cart
            </Button>
          ) : (
            <Button disabled>Sold Out</Button>
          )}
        </div>
      </div>
    </li>
  );
}

MenuItem.propTypes = {
  pizza: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // added id
    name: PropTypes.string.isRequired,
    unitPrice: PropTypes.number.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    soldOut: PropTypes.bool.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default MenuItem;
