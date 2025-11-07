# 🍕 Fast React Pizza

A fast and interactive pizza ordering web app built with **React**, **React Router**, and **Redux Toolkit**.  
Users can browse the menu, add pizzas to their cart, place an order, and update existing orders (e.g., make an order priority).

---

## 🚀 Features

- 🍽️ View pizza menu (loaded via route loader)
- 🛒 Add or remove pizzas from cart
- 📦 Create new orders
- ⚡ Update existing orders (mark as priority)
- 🧮 View estimated delivery time
- ✅ Modern UI with modular React components

---

## 🛠️ Tech Stack

- **React 18**
- **React Router DOM v6**
- **Redux Toolkit**
- **Vite**
- **ESLint** (for clean code)
- **PropTypes** for component validation

---

## 📂 Project Structure

src/
├── features/
│ ├── cart/ # Cart logic and components
│ ├── menu/ # Pizza menu and loader
│ ├── order/ # Order creation & update logic
│ └── ui/ # Shared UI components (Layout, Error, etc.)
├── services/ # API functions (apiRestaurant.js)
├── utils/ # Helper functions (formatCurrency, calcMinutesLeft)
└── App.jsx # Main router configuration



---

## ⚙️ Setup and Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/fast-react-pizza.git
   cd fast-react-pizza
Install dependencies:

npm install
Start the development server:


npm run dev
Open your browser at:


http://localhost:5173
🧩 Routing Overview
Path	Description
/	Home page
/menu	Pizza menu with loader
/cart	Cart overview
/order/new	Create new order
/order/:orderId	View or update existing order

💡 Notes
UpdateOrder.jsx handles priority updates using fetcher.Form.

App.jsx defines routes and links loaders/actions to components.

API calls are simulated in apiRestaurant.js.

👨‍💻 Author
Adelana Oluwafunmibi Cornelius
Built as part of the Fast React Pizza learning project.

📄 License
This project is open-source and available under the MIT License.
