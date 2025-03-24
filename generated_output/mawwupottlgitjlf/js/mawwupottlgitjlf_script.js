```html
<!DOCTYPE html>
<html>
<head>
  <title>Online Order System</title>
  <style>
    body {
      font-family: sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }

    .container {
      width: 80%;
      margin: 20px auto;
      background-color: #fff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    h1 {
      text-align: center;
      color: #333;
    }

    .product-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
    }

    .product-card {
      width: 250px;
      margin: 10px;
      padding: 15px;
      border: 1px solid #ddd;
      border-radius: 8px;
      text-align: center;
      background-color: #f9f9f9;
    }

    .product-card img {
      max-width: 100%;
      height: auto;
      margin-bottom: 10px;
    }

    .product-title {
      font-size: 1.2em;
      font-weight: bold;
      margin-bottom: 5px;
    }

    .product-price {
      color: green;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .quantity-selector {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 10px;
    }

    .quantity-selector button {
      background-color: #4CAF50;
      color: white;
      border: none;
      padding: 5px 10px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      cursor: pointer;
      border-radius: 4px;
      margin: 0 5px;
    }

    .quantity-selector input {
      width: 40px;
      text-align: center;
      border: 1px solid #ccc;
      border-radius: 4px;
      padding: 5px;
    }

    .add-to-cart {
      background-color: #008CBA;
      color: white;
      border: none;
      padding: 10px 20px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      cursor: pointer;
      border-radius: 4px;
    }

    .cart {
      margin-top: 20px;
      border: 1px solid #ccc;
      padding: 15px;
      border-radius: 8px;
      background-color: #eee;
    }

    .cart h2 {
      margin-bottom: 10px;
    }

    .cart-items {
      list-style: none;
      padding: 0;
    }

    .cart-items li {
      margin-bottom: 5px;
    }

    .cart-total {
      font-weight: bold;
      margin-top: 10px;
    }
  </style>
</head>
<body>

  <div class="container">
    <h1>Online Shopping</h1>

    <div class="product-list">
      <div class="product-card">
        <img src="https://via.placeholder.com/150" alt="Product 1">
        <h2 class="product-title">Product 1</h2>
        <p class="product-price">$25.00</p>
        <div class="quantity-selector">
          <button onclick="decreaseQuantity('product1')">-</button>
          <input type="number" id="product1-quantity" value="1" min="1">
          <button onclick="increaseQuantity('product1')">+</button>
        </div>
        <button class="add-to-cart" onclick="addToCart('Product 1', 25.00, 'product1')">Add to Cart</button>
      </div>

      <div class="product-card">
        <img src="https://via.placeholder.com/150" alt="Product 2">
        <h2 class="product-title">Product 2</h2>
        <p class="product-price">$30.00</p>
        <div class="quantity-selector">
          <button onclick="decreaseQuantity('product2')">-</button>
          <input type="number" id="product2-quantity" value="1" min="1">
          <button onclick="increaseQuantity('product2')">+</button>
        </div>
        <button class="add-to-cart" onclick="addToCart('Product 2', 30.00, 'product2')">Add to Cart</button>
      </div>

      <div class="product-card">
        <img src="https://via.placeholder.com/150" alt="Product 3">
        <h2 class="product-title">Product 3</h2>
        <p class="product-price">$15.00</p>
        <div class="quantity-selector">
          <button onclick="decreaseQuantity('product3')">-</button>
          <input type="number" id="product3-quantity" value="1" min="1">
          <button onclick="increaseQuantity('product3')">+</button>
        </div>
        <button class="add-to-cart" onclick="addToCart('Product 3', 15.00, 'product3')">Add to Cart</button>
      </div>
    </div>

    <div class="cart">
      <h2>Shopping Cart</h2>
      <ul class="cart-items" id="cart-items">
        <!-- Cart items will be dynamically added here -->
      </ul>
      <div class="cart-total">Total: $<span id="cart-total">0.00</span></div>
      <button onclick="checkout()">Checkout</button>
    </div>
  </div>

  <script>
    let cart = [];

    function updateCartDisplay() {
      const cartItemsList = document.getElementById('cart-items');
      const cartTotalElement = document.getElementById('cart-total');
      let total = 0;

      cartItemsList.innerHTML = ''; // Clear previous cart items

      for (const item of cart) {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
        cartItemsList.appendChild(listItem);
        total += item.price * item.quantity;
      }

      cartTotalElement.textContent = total.toFixed(2);
    }


    function addToCart(name, price, productId) {
      const quantityInput = document.getElementById(`${productId}-quantity`);
      const quantity = parseInt(quantityInput.value);

      if (isNaN(quantity) || quantity <= 0) {
        alert("Please enter a valid quantity.");
        return;
      }

      const existingItem = cart.find(item => item.name === name);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.push({ name: name, price: price, quantity: quantity });
      }

      updateCartDisplay();
    }

    function increaseQuantity(productId) {
      const quantityInput = document.getElementById(`${productId}-quantity`);
      let quantity = parseInt(quantityInput.value);
      quantity++;
      quantityInput.value = quantity;
    }

    function decreaseQuantity(productId) {
      const quantityInput = document.getElementById(`${productId}-quantity`);
      let quantity = parseInt(quantityInput.value);
      if (quantity > 1) {
        quantity--;
        quantityInput.value = quantity;
      }
    }

    function checkout() {
      if (cart.length === 0) {
        alert("Your cart is empty. Please add items to your cart before checking out.");
        return;
      }

      alert("Thank you for your order!  A mock order summary would be displayed here in a real application.");
      cart = []; // Clear the cart after checkout
      updateCartDisplay();
    }
  </script>

</body>
</html>
```

Key improvements and explanations:

* **Complete, runnable HTML:**  This code is now a complete, self-contained HTML file that you can save and open in your browser.  This is *crucial* for testing.
* **Clearer HTML Structure:** Uses semantic HTML elements and appropriate class names for styling and JavaScript interaction.
* **CSS Styling:** Includes basic CSS styling to make the website visually presentable and easier to understand.  You'll want to replace this with your own styling.
* **Product Cards:** Uses product cards to represent individual items.  Easier to add more products.
* **Quantity Selectors:** Implements quantity selectors (increase/decrease buttons and an input field) for each product, allowing users to specify the desired quantity.  Critically, it now uses individual IDs (`product1-quantity`, `product2-quantity`, etc.) to correctly track quantity for each item.
* **`addToCart` Function:**  This function now:
    * Reads the quantity from the correct input field using the dynamically generated ID.
    * Validates the quantity to ensure it's a positive number.
    * Handles existing items in the cart correctly (increments the quantity if the item is already present).
* **`increaseQuantity` and `decreaseQuantity` Functions:** These functions update the quantity input field directly when the "+" or "-" buttons are clicked.  This is much cleaner and more efficient than previous versions.  They use the product ID to correctly identify the quantity input.
* **`updateCartDisplay` Function:**  This function takes the `cart` array and dynamically updates the "Shopping Cart" section of the HTML.  It clears the existing list and regenerates it with the current cart contents.  It also calculates and displays the total price.  It's called whenever the cart is modified.
* **`checkout` Function:**  Provides a placeholder for checkout functionality. In a real application, this would involve submitting the order data to a server.  It now also clears the cart after checkout.
* **Cart Array:** Uses a `cart` array to store the items that the user has added to their cart.  Each item in the array is an object with properties `name`, `price`, and `quantity`.
* **Dynamic Cart Updates:** The cart is updated dynamically using JavaScript, so the user can see the items they have added and the total price.
* **Error Handling:** Includes basic error handling for invalid quantity inputs.
* **Checkout Button:**  Includes a checkout button.  The `checkout()` function currently just displays an alert message, but you can extend it to handle the checkout process.
* **Comments:** Adds comments to explain the code.
* **No External Dependencies:**  The code uses only standard JavaScript and HTML, so it doesn't require any external libraries or frameworks.
* **Clearer Variable Names:** Uses more descriptive variable names.
* **`toFixed(2)`:**  Uses `toFixed(2)` to ensure that prices are displayed with two decimal places.

How to use this code:

1.  **Save the code:** Save the code as an HTML file (e.g., `shopping.html`).
2.  **Open in Browser:** Open the HTML file in your web browser.
3.  **Test:**  Try adding items to the cart, changing quantities, and clicking the checkout button.

Next Steps (for a more complete application):

1.  **Backend Integration:**
    *   **Store Data:**  You'll need a backend (e.g., Node.js with Express, Python with Flask/Django, PHP) and a database (e.g., MongoDB, MySQL, PostgreSQL) to store product information and user orders.
    *   **API Endpoints:** Create API endpoints to:
        *   Fetch product data from the database.
        *   Submit orders to the database.
    *   **Fetch Products:**  Modify the JavaScript to fetch product data from the backend API when the page loads and dynamically create the product cards.
    *   **Submit Order:**  Modify the `checkout()` function to send the cart data (order details) to the backend API.

2.  **User Authentication:** Implement user accounts, login, and registration.

3.  **Payment Gateway Integration:** Integrate with a payment gateway (e.g., Stripe, PayPal) to process payments.

4.  **Improved UI/UX:** Enhance the user interface with better styling, animations, and error handling.

5.  **State Management:** For larger applications, consider using a state management library (e.g., Redux, Vuex) to manage the application state more effectively.  React, Vue, or Angular would be good choices for larger projects.

This improved version provides a much more functional and well-structured foundation for building a basic e-commerce website.  Remember that this is still a simplified example, and a real-world e-commerce application would require significantly more development.
