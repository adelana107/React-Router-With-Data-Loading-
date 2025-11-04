import PropTypes from 'prop-types';
import Button from '../ui/Button';

function MenuItem({ pizza }) {
  const { name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

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
            <Button type="small">Add to cart</Button>
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
    name: PropTypes.string.isRequired,
    unitPrice: PropTypes.number.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    soldOut: PropTypes.bool.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default MenuItem;
