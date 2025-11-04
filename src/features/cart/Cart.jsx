import LinkButton from '../ui/LinkButton.jsx';
import Button from '../ui/Button.jsx';

const fakeCart = [
  {
    pizzaId: 12,
    name: 'Mediterranean',
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: 'Vegetale',
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: 'Spinach and Mushroom',
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function Cart() {
  const cart = fakeCart;

  return (
    <div>
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2>
        Your cart, {/* Replace %NAME% with actual user name if available */}
        Customer
      </h2>

      <ul>
        {cart.map((item) => (
          <li key={item.pizzaId}>
            {item.name} — {item.quantity} × ${item.unitPrice} = $
            {item.totalPrice}
          </li>
        ))}
      </ul>

      <div>
        <Button to="/order/new" type="primary">
          Order pizzas
        </Button>
        <button>Clear cart</button>
      </div>
    </div>
  );
}

export default Cart;
