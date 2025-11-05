import LinkButton from '../ui/LinkButton.jsx';
import Button from '../ui/Button.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { getCart, clearCart } from '../cart/cartSlice';
import EmptyCart from './EmptyCart.jsx';

function Cart() {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.username);
  const cart = useSelector(getCart);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-3">
      {/* Back link */}
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      {/* Heading */}
      <h2 className="mt-7 text-lg font-semibold text-stone-800">
        Your cart, {username}
      </h2>

      {/* Cart items */}
      <ul className="mt-3 divide-y divide-stone-200 border-b border-stone-200">
        {cart.map((item) => (
          <li
            key={item.pizzaId}
            className="flex justify-between py-2 text-stone-700"
          >
            <span>
              {item.name} — {item.quantity} × ${item.unitPrice}
            </span>
            <span className="font-medium">${item.totalPrice}</span>
          </li>
        ))}
      </ul>

      {/* Buttons */}
      <div className="mt-6 flex items-center gap-3">
        <Button to="/order/new" type="primary">
          Order pizzas
        </Button>
        <Button type="secondary" onClick={handleClearCart}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
