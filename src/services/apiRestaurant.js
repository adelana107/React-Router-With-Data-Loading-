const API_URL = "https://react-fast-pizza-api.jonas.io/api";

// ✅ Get the menu
export async function getMenu() {
  const res = await fetch(`${API_URL}/menu`);

  // fetch doesn't throw for 4xx/5xx responses — handle manually
  if (!res.ok) throw new Error("Failed getting menu");

  const { data } = await res.json();
  return data;
}

// ✅ Get a specific order by ID
export async function getOrder(id) {
  const res = await fetch(`${API_URL}/order/${id}`);

  if (!res.ok) throw new Error(`Couldn't find order #${id}`);

  const { data } = await res.json();
  return data;
}

// ✅ Create a new order
export async function createOrder(newOrder) {
  try {
    const res = await fetch(`${API_URL}/order`, {
      method: "POST",
      body: JSON.stringify(newOrder),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw new Error("Failed creating your order");

    const { data } = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    throw new Error("Failed creating your order");
  }
}

// ✅ Update an existing order (e.g., marking as delivered or changing priority)
export async function updateOrder(id, updateObj) {
  try {
    const res = await fetch(`${API_URL}/order/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updateObj),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw new Error("Failed updating your order");
  } catch (err) {
    console.error(err);
    throw new Error("Failed updating your order");
  }
}
