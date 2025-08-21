document.addEventListener("DOMContentLoaded", () => {
    let acceptedOrders = JSON.parse(localStorage.getItem("previousOrders")) || [];
    const countOrders = document.querySelector(".checkout-items");
    const total = acceptedOrders.reduce((acc, item) => acc + parseFloat(item.price.replace(/[^0-9.]/g, "")) * parseInt(item.quantity), 0);
    const totalQuantity = acceptedOrders.reduce((acc, item) => acc + parseInt(item.quantity), 0);
    acceptedOrders.forEach(item => {
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