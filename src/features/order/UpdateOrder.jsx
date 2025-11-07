import PropTypes from 'prop-types';
import { useFetcher, redirect } from 'react-router-dom';
import { updateOrder } from '../../services/apiRestaurant';
import OrderItem from './OrderItem';
import { calcMinutesLeft, formatCurrency } from '../../utils/helpers';
import Button from '../ui/Button';

function UpdateOrder({ order }) {
  const fetcher = useFetcher();

  if (!order) return <p>No order found.</p>;

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

  return (
    <div className="px-4 py-6 space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">
          Order <span className="font-mono text-sm">#{id}</span> status
        </h2>

        <div className="flex items-center gap-2">
          {priority && (
            <span className="bg-red-500 text-white text-xs font-bold uppercase px-3 py-1 rounded-full">
              Priority
            </span>
          )}
          <span className="bg-green-500 text-white text-xs font-bold uppercase px-3 py-1 rounded-full">
            {status.replace('_', ' ')}
          </span>
        </div>
      </div>

      {/* Time left */}
      <div className="bg-stone-200 text-stone-700 p-4 rounded-md flex justify-between items-center">
        <p className="text-lg font-medium">
          {deliveryIn >= 0
            ? `Only ${deliveryIn} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p className="text-sm text-stone-500">
          (Estimated delivery: {new Date(estimatedDelivery).toLocaleString()})
        </p>
      </div>

      {/* Items */}
      <ul className="divide-y divide-stone-200 border-b border-t border-stone-200">
        {cart.map((item) => (
          <OrderItem
            key={item.pizzaId}
            item={item}
            isLoadingIngredients={false}
          />
        ))}
      </ul>

      {/* Price summary */}
      <div className="bg-stone-200 p-4 rounded-md space-y-1 text-stone-700">
        <p className="flex justify-between">
          <span>Price pizza:</span>
          <span>{formatCurrency(orderPrice)}</span>
        </p>
        {priority && (
          <p className="flex justify-between">
            <span>Price priority:</span>
            <span>{formatCurrency(priorityPrice)}</span>
          </p>
        )}
        <p className="flex justify-between font-semibold border-t border-stone-300 pt-2">
          <span>To pay on delivery:</span>
          <span>{formatCurrency(orderPrice + (priority ? priorityPrice : 0))}</span>
        </p>
      </div>

      {/* Update button */}
      {!priority && (
        <fetcher.Form method="PATCH">
          <Button type="primary" disabled={fetcher.state === 'submitting'}>
            {fetcher.state === 'submitting' ? 'Updating...' : 'Make Priority'}
          </Button>
        </fetcher.Form>
      )}
    </div>
  );
}

UpdateOrder.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    status: PropTypes.string,
    priority: PropTypes.bool,
    priorityPrice: PropTypes.number,
    orderPrice: PropTypes.number,
    estimatedDelivery: PropTypes.string,
    cart: PropTypes.arrayOf(
      PropTypes.shape({
        pizzaId: PropTypes.number,
        name: PropTypes.string,
        quantity: PropTypes.number,
        totalPrice: PropTypes.number,
        ingredients: PropTypes.arrayOf(PropTypes.string),
      })
    ),
  }),
};

export default UpdateOrder;

/* ✅ FIXED ACTION */
export async function action({ params }) {
  const orderId = params.orderId;
  await updateOrder(orderId, { priority: true });

  // ✅ Redirect forces React Router to reload order data (re-run loader)
  return redirect(`/order/${orderId}`);
}
