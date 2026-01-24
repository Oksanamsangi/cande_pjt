document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.querySelector(".cart-items");
  const totalPriceEl = document.getElementById("total-price");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function renderCart() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item) => {
      total += item.price * item.quantity;

      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");

      cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-details">
          <h3>${item.name}</h3>
          <p>$${item.price}</p>
        </div>
        <div class="cart-item-controls">
          <input type="number" min="1" value="${item.quantity}">
          <button>Remove</button>
        </div>
      `;

      const quantityInput = cartItem.querySelector("input");
      const removeBtn = cartItem.querySelector("button");

      quantityInput.addEventListener("change", (e) => {
        let value = parseInt(e.target.value);
        if (value < 1) value = 1;

        item.quantity = value;
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
      });

      removeBtn.addEventListener("click", () => {
        cart = cart.filter((i) => i.id !== item.id);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
      });

      cartItemsContainer.appendChild(cartItem);
    });

    totalPriceEl.textContent = total.toFixed(2);
  }

  renderCart();
});
