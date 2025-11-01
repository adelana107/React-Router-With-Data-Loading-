import { Link } from "react-router-dom";

function CartOverview() {
  return (
    <div className="cart-overview">
      <p>
        <span>23 pizzas</span>
        <span>$23.45</span>
      </p>
      <Link to="/cart" className="cart-link">
        Open cart &rarr;
      </Link>
    </div>
  );
}

export default CartOverview;
