


document.addEventListener("DOMContentLoaded", () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const countOrders = document.querySelector(".checkout-items");
  const total = cart.reduce((acc, item) => acc + parseFloat(item.price.replace(/[^0-9.]/g, "")) * parseInt(item.quantity), 0);
  const totalQuantity = cart.reduce((acc, item) => acc + parseInt(item.quantity), 0);
  cart.forEach(item => {
    const name = item.name;
    const quantity = item.quantity;
    const total = parseFloat(item.price.replace(/[^0-9.]/g, "")) * parseInt(item.quantity);
    countOrders.innerHTML += `<tr>
          <td class="name-product">${item.name} : ${quantity}</td>
          <td class="subtotal">$${total.toFixed(2)}</td>
          </tr>
          `;
  });
  countOrders.innerHTML += `<tr>
          <td class="name-product">Total: ${totalQuantity}</td>
          <td class="subtotal">$${total.toFixed(2)}</td>
          </tr>
          `;
});

//place order
let checkoutOrders = JSON.parse(localStorage.getItem("checkoutOrders")) || [];
document.addEventListener("DOMContentLoaded", () => {
  const checkOutBtn = document.querySelector(".checkout-btn");
  if (checkOutBtn) {
    checkOutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      showAlert(`Done!`, "#779c26")
      setTimeout(() => closeAlert(), 2000);
      checkoutOrders = cart;
      cart = [];
      localStorage.setItem("checkoutOrders", JSON.stringify(checkoutOrders));
    });
  }
});
