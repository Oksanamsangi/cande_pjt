document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".add-to-cart");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const product = {
        name: button.dataset.name,
        price: Number(button.dataset.price),
        image: button.dataset.image,
        quantity: 1,
      };

      addToCart(product);
    });
  });

  function addToCart(product) {
   
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    
    cart.push(product);

   
    localStorage.setItem("cart", JSON.stringify(cart));

   
    alert(`${product.name} додано в корзину 🤍`);
  }
});
