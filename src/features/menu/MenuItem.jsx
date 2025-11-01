import PropTypes from "prop-types";

function MenuItem({ pizza }) {
  const { name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  return (
    <li className="menu-item">
      <img src={imageUrl} alt={name} />
      <div>
        <h3>{name}</h3>
        <p>{ingredients.join(", ")}</p>
        <span>{soldOut ? "Sold Out" : `${unitPrice} USD`}</span>
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
