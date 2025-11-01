// Test ID: IIDSAT

import { useLoaderData } from "react-router-dom";

import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import { getOrder } from "../../services/apiRestaurant"; // ✅ make sure this path exists!

function Order() {
  const order = useLoaderData();
  const { id, status, priority, priorityPrice, orderPrice, estimatedDelivery } =
    order;

  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div>
      <div>
        <h2>Order #{id}</h2>

        <div>
          {priority && <span>🔥 Priority</span>}
          <span>{status} order</span>
        </div>
      </div>

      <div>
        <p>
          {deliveryIn >= 0
            ? `Only ${deliveryIn} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p>(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>

      <div>
        <p>Price of pizzas: {formatCurrency(orderPrice)}</p>
        {priority && <p>Priority fee: {formatCurrency(priorityPrice)}</p>}
        <p>
          <strong>
            To pay on delivery:{" "}
            {formatCurrency(orderPrice + (priority ? priorityPrice : 0))}
          </strong>
        </p>
      </div>
    </div>
  );
}

// ✅ Re-add the loader export here
export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
