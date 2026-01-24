document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".add-to-cart");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function addToCart(product) {
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    showNotification(`${product.name} added 🕯️`);
  }

  function showNotification(message) {
    const notification = document.getElementById("notification");
    if (!notification) return;

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

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const product = {
        id: button.dataset.id,
        name: button.dataset.name.trim(),
        price: Number(button.dataset.price),
        image: button.dataset.image,
        quantity: 1,
      };

      addToCart(product);
    });
  });
});
