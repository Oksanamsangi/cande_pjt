document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".add-to-cart");
  const cartItemsContainer = document.querySelector(".cart-items");
  const totalPriceEl = document.getElementById("total-price");

  // Завантажуємо корзину з localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Додаємо товар у корзину
  function addToCart(product) {
    // Шукаємо товар за name
    const existingItem = cart.find((item) => item.name === product.name);

    if (existingItem) {
      // Якщо є, збільшуємо quantity
      existingItem.quantity += 1;
      updateCartItemDOM(existingItem);
    } else {
      // Якщо немає, додаємо новий блок
      cart.push(product);
      createCartItemDOM(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateTotal();
    showNotification(`${product.name} додано в корзину 🤍`);
  }

  // Створюємо новий блок DOM для товару
  function createCartItemDOM(item) {
    const cartItemEl = document.createElement("div");
    cartItemEl.classList.add("cart-item");
    cartItemEl.dataset.name = item.name; // ключ для перевірки існування

    cartItemEl.innerHTML = `
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

    const quantityInput = cartItemEl.querySelector("input");
    const removeBtn = cartItemEl.querySelector("button");

    quantityInput.addEventListener("change", (e) => {
      let value = parseInt(e.target.value);
      if (value < 1) value = 1;
      item.quantity = value;
      localStorage.setItem("cart", JSON.stringify(cart));
      updateTotal();
    });

    removeBtn.addEventListener("click", () => {
      cart = cart.filter((i) => i.name !== item.name);
      localStorage.setItem("cart", JSON.stringify(cart));
      cartItemEl.remove();
      updateTotal();
    });

    cartItemsContainer.appendChild(cartItemEl);
  }

  // Оновлюємо quantity у DOM
  function updateCartItemDOM(item) {
    const cartItemEl = cartItemsContainer.querySelector(
      `[data-name="${item.name}"]`
    );
    if (!cartItemEl) return;
    const quantityInput = cartItemEl.querySelector("input");
    quantityInput.value = item.quantity;
  }

  // Оновлення загальної ціни
  function updateTotal() {
    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    totalPriceEl.textContent = total.toFixed(2);
  }

  // Сповіщення
  function showNotification(message) {
    const notification = document.getElementById("notification");
    notification.textContent = message;
    notification.style.display = "block";

    requestAnimationFrame(() => {
      notification.style.opacity = "1";
      notification.style.transform = "translateX(-50%) translateY(50px)";
    });

    setTimeout(() => {
      notification.style.opacity = "0";
      notification.style.transform = "translateX(-50%) translateY(-50px)";
      setTimeout(() => {
        notification.style.display = "none";
      }, 600);
    }, 2000);
  }

  // Кнопки додавання
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const product = {
        name: button.dataset.name.trim(), // прибираємо пробіли
        price: Number(button.dataset.price),
        image: button.dataset.image,
        quantity: 1,
      };
      addToCart(product);
    });
  });

  // Ініціалізація при завантаженні
  cart.forEach((item) => createCartItemDOM(item));
  updateTotal();
});
