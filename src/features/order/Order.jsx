// Test ID: IIDSAT

import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../utils/helpers';
import { getOrder } from '../../services/apiRestaurant';
import OrderItem from './OrderItem.jsx';

function Order() {
  const orderData = useLoaderData();
  const [order, setOrder] = useState(orderData);

  const { id, status, priority, priorityPrice, orderPrice, estimatedDelivery } =
    order;

  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  // 🧩 Function to handle removing an item locally
  function handleRemoveItem(itemId) {
    const updatedCart = order.cart.filter((item) => item.id !== itemId);
    setOrder((prev) => ({ ...prev, cart: updatedCart }));
  }

  return (
    <div className="space-y-8 px-4 py-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Order #{id} status</h2>

        <div className="space-x-2">
          {priority && (
            <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold tracking-wide text-red-50">
              🔥 Priority
            </span>
          )}
          <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold tracking-wide text-green-50">
            {status} order
          </span>
        </div>
      </div>

      {/* Delivery info */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${deliveryIn} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      {/* Cart items */}
      <ul>
        {order.cart.map((item) => (
          <OrderItem
            key={item.pizzaId}
            item={item}
            onRemove={handleRemoveItem}
          />
        ))}
      </ul>

      {/* Totals */}
      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium text-stone-600">
          Price of pizzas: {formatCurrency(orderPrice)}
        </p>
        {priority && <p>Priority fee: {formatCurrency(priorityPrice)}</p>}
        <p className="font-bold text-stone-800">
          <strong>
            To pay on delivery:{' '}
            {formatCurrency(orderPrice + (priority ? priorityPrice : 0))}
          </strong>
        </p>
      </div>
    </div>
  );
}

// ✅ loader for React Router
export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
