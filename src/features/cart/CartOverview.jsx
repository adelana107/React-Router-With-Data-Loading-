import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getTotalCartPrice, getTotalCartQuantity } from '../cart/cartSlice';

function CartOverview() {
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  const totalCartPrice = useSelector(getTotalCartPrice);

  if (!totalCartQuantity) return null;

  return (
    <div className="flex items-center justify-between bg-stone-800 p-4 text-sm uppercase text-stone-200 sm:space-x-6 sm:px-6 md:text-base">
      <p className="space-x-4 text-stone-300 sm:px-6 md:text-base">
        <span>{totalCartQuantity} pizzas</span>
        <span>${totalCartPrice.toFixed(2)}</span>
      </p>
      <Link to="/cart" className="cart-link">
        Open cart &rarr;
      </Link>
    </div>
  );
}

export default CartOverview;
