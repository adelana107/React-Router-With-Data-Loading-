import { useState } from "react";
import { Form, redirect, useNavigation, useActionData } from "react-router-dom";

// ✅ Utility function to validate phone numbers
function isValidPhone(str) {
  return /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );
}

// ✅ Fake API function to create an order
async function createOrder(orderData) {
  console.log("Sending order to server:", orderData);
  return { id: "ABC123" }; // Fake order ID
}

// ✅ CreateOrder Component
function CreateOrder() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const formErrors = useActionData();

  const [withPriority, setWithPriority] = useState(false);
  const [customer, setCustomer] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const cart = [
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

  return (
    <div>
      <h2>Ready to order? Let&apos;s go!</h2>

      <Form method="POST">
        <div>
          <label>First Name</label>
          <input
            type="text"
            name="customer"
            required
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
          />
        </div>

        <div>
          <label>Phone number</label>
          <input
            type="tel"
            name="phone"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {formErrors?.phone  && <p>{formErrors.phone}</p>}
        </div>

        <div>
          <label>Address</label>
          <input
            type="text"
            name="address"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div>
          <input
            type="checkbox"
            name="priority"
            id="priority"
            checked={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Give your order priority?</label>
        </div>

        <input type="hidden" name="cart" value={JSON.stringify(cart)} />

        <div>
          <button disabled={isSubmitting}>
            {isSubmitting ? "Placing order..." : "Order now"}
          </button>
        </div>
      </Form>
    </div>
  );
}

// ✅ Action function for form submission
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "on",
  };

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      "Please give us your correct phone number, we might need it to contact you";

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
