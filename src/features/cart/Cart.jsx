import LinkButton from "../ui/LinkButton.jsx";
import Button from "../ui/Button.jsx";

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function Cart() {
  const cart = fakeCart;

  return (
    <div className="px-4 py-3">
      {/* Back link */}
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      {/* Heading */}
      <h2 className="mt-7 text-lg font-semibold text-stone-800">
        Your cart, Customer
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
        <Button type="secondary">Clear cart</Button>
      </div>
    </div>
  );
}

export default Cart;
