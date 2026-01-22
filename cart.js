document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.querySelector(".cart-items");
  const totalPriceEl = document.getElementById("total-price");

 
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function renderCart() {
    cartItemsContainer.innerHTML = ""; 
    let total = 0;

    cart.forEach((item, index) => {
      total += item.price * item.quantity;

      
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");

     
      const img = document.createElement("img");
      img.src = item.image;
      img.alt = item.name;

     
      const detailsDiv = document.createElement("div");
      detailsDiv.classList.add("cart-item-details");
      detailsDiv.innerHTML = `<h3>${item.name}</h3><p>$${item.price}</p>`;

   
      const controlsDiv = document.createElement("div");
      controlsDiv.classList.add("cart-item-controls");

   
      const quantityInput = document.createElement("input");
      quantityInput.type = "number";
      quantityInput.min = 1;
      quantityInput.value = item.quantity;

      quantityInput.addEventListener("change", (e) => {
        let value = parseInt(e.target.value);
        if (value < 1) value = 1;
        cart[index].quantity = value;
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
      });

     
      const removeBtn = document.createElement("button");
      removeBtn.textContent = "Remove";
      removeBtn.addEventListener("click", () => {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
      });

      controlsDiv.appendChild(quantityInput);
      controlsDiv.appendChild(removeBtn);

     
      cartItem.appendChild(img);
      cartItem.appendChild(detailsDiv);
      cartItem.appendChild(controlsDiv);

     
      cartItemsContainer.appendChild(cartItem);
    });

   
    totalPriceEl.textContent = total.toFixed(2);
  }

  renderCart();
});
