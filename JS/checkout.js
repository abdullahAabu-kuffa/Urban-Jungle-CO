
import { showAlert, closeAlert } from "./main.js";
import { cart } from "./main.js";

document.addEventListener("DOMContentLoaded", () => {
  const countOrders = document.querySelector(".checkout-items");
  const total = cart.reduce((acc, item) => acc + parseFloat(item.price.replace(/[^0-9.]/g, "")) * parseInt(item.quantity), 0);
  const totalQuantity = cart.reduce((acc, item) => acc + parseInt(item.quantity), 0);
  cart.forEach(item => {
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
      checkoutOrders = cart;
      if (checkoutOrders != 0) {
        showAlert(`Done!`, "#779c26")
        setTimeout(() => closeAlert(), 2000);
        localStorage.setItem("checkoutOrders", JSON.stringify(checkoutOrders));
      }
      else {
        showAlert(`The Cart Is Empty`, "#b11111ff")
        setTimeout(() => closeAlert(), 2000);
      }

    });
  }
});
