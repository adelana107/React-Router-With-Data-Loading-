import { useState, useEffect } from 'react';
import { useLoaderData, useFetcher } from 'react-router-dom';
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../utils/helpers';
import { getOrder } from '../../services/apiRestaurant';
import OrderItem from './OrderItem.jsx';
import UpdateOrder from './UpdateOrder.jsx';

function Order() {
  const orderData = useLoaderData();
  const [order, setOrder] = useState(orderData);
  const fetcher = useFetcher();

  // ✅ Preload menu to get ingredients
  useEffect(() => {
    if (!fetcher.data && fetcher.state === 'idle') fetcher.load('/menu');
  }, [fetcher]);

  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;

  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  // ✅ Handle removing item locally
  function handleRemoveItem(itemId) {
    const updatedCart = cart.filter((item) => item.pizzaId !== itemId);
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
        {cart.map((item) => {
          const menuItem = fetcher?.data?.find((el) => el.id === item.pizzaId);

          return (
            <OrderItem
              key={item.pizzaId}
              isLoadingIngredients={fetcher.state === 'loading'}
              item={item}
              ingredients={menuItem?.ingredients}
              onRemove={handleRemoveItem}
            />
          );
        })}
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
      {!priority && <UpdateOrder order={order} />}
    </div>
  );
}

// ✅ React Router loader
export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
