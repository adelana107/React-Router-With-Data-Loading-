import { useState } from "react";

// ✅ Utility function to validate phone numbers
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(str);

const fakeCart = [
  { pizzaId: 12, name: "Mediterranean", quantity: 2, unitPrice: 16, totalPrice: 32 },
  { pizzaId: 6, name: "Vegetale", quantity: 1, unitPrice: 13, totalPrice: 13 },
  { pizzaId: 11, name: "Spinach and Mushroom", quantity: 1, unitPrice: 15, totalPrice: 15 },
];

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const [customer, setCustomer] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  const cart = fakeCart;

  function handleSubmit(e) {
    e.preventDefault();

    // ✅ validate phone number before submission
    if (!isValidPhone(phone)) {
      setError("Please enter a valid phone number.");
      return;
    }

    const newOrder = {
      customer,
      phone,
      address,
      cart,
      priority: withPriority,
    };

    console.log("Order created:", newOrder);
    alert("✅ Order placed successfully!");
    setError("");
  }

  return (
    <div>
      {/* ✅ Escaped apostrophe to fix ESLint warning */}
      <h2>Ready to order? Let&apos;s go!</h2>

      <form onSubmit={handleSubmit}>
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
          {error && <p style={{ color: "red" }}>{error}</p>}
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

        <div>
          <button type="submit">Order now</button>
        </div>
      </form>
    </div>
  );
}

export default CreateOrder;
