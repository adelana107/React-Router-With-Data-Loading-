// src/features/order/UpdateOrderWrapper.jsx
import { useLoaderData } from 'react-router-dom';
import UpdateOrder from './UpdateOrder';

export default function UpdateOrderWrapper() {
  const order = useLoaderData(); // gets data from orderLoader
  return <UpdateOrder order={order} />;
}

// ✅ Re-export the action from UpdateOrder so the route can access it
export { action } from './UpdateOrder';
