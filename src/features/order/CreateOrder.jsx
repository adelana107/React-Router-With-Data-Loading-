import { useState } from 'react';
import { Form, redirect, useNavigation, useActionData } from 'react-router-dom';
import Button from '../ui/Button.jsx';

// ✅ Utility function to validate phone numbers
function isValidPhone(str) {
  return /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );
}

// ✅ API call for order creation
async function createOrder(orderData) {
  const res = await fetch('https://react-fast-pizza-api.jonas.io/api/order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  });

  if (!res.ok) throw new Error('Failed to create order');
  return await res.json(); // returns { id: "REAL_ID", ... }
}

// ✅ Main component
function CreateOrder() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const formErrors = useActionData();

  const [withPriority, setWithPriority] = useState(false);
  const [customer, setCustomer] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  // Fake cart data for demo
  const cart = [
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

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">
        Ready to order? Let&apos;s go!
      </h2>

      <Form method="POST">
        {/* Customer name */}
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label htmlFor="customer" className="sm:basis-40">
            First Name
          </label>
          <input
            id="customer"
            type="text"
            name="customer"
            required
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            className="w-full rounded-full border border-stone-200 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-400 md:px-6 md:py-3"
          />
        </div>

        {/* Phone */}
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label htmlFor="phone" className="sm:basis-40">
            Phone number
          </label>
          <div className="grow">
            <input
              id="phone"
              type="tel"
              name="phone"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-full border border-stone-200 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-400 md:px-6 md:py-3"
            />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        {/* Address */}
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label htmlFor="address" className="sm:basis-40">
            Address
          </label>
          <input
            id="address"
            type="text"
            name="address"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full rounded-full border border-stone-200 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-400 md:px-6 md:py-3"
          />
        </div>

        {/* Priority checkbox */}
        <div className="mb-6 flex items-center gap-3">
          <input
            className="h-5 w-5 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            checked={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="text-sm font-medium">
            Give your order priority?
          </label>
        </div>

        <input type="hidden" name="cart" value={JSON.stringify(cart)} />

        <div>
          <Button disabled={isSubmitting} type="primary">
            {isSubmitting ? 'Placing order...' : 'Order now'}
          </Button>
        </div>
      </Form>
    </div>
  );
}

// ✅ Form submission action
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'on',
  };

  // Validate
  const errors = {};
  if (!isValidPhone(order.phone)) {
    errors.phone =
      'Please enter a valid phone number — we might need it to contact you.';
  }

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
