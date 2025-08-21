

const menuBtn = document.getElementById("menu-btn");
const closeBtn = document.getElementById("close-btn");
const sidebar = document.getElementById("sidebar");

menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("active");
});

closeBtn.addEventListener("click", () => {
    sidebar.classList.remove("active");
});

const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

//
document.addEventListener("DOMContentLoaded", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartBody = document.querySelector(".orders-items");
    cartBody.querySelectorAll("tr").forEach(el => el.remove());

    function renderCart() {
        cart.forEach((item) => {
            const itemEl = document.createElement("tr");
            console.log(item.currentUser.name);
            itemEl.innerHTML = `
            <td class="client-name">${item.currentUser.name}</td>
               <td class="orders-product-cell">
                   <img src=${item.imageSrc} alt="Golden Glow">
                   <span class="name">${item.name}</span>
                </td>
                <td class = "price">${item.price}</td>
                <td >${item.quantity}</td>
                <td>$${parseFloat(item.price.replace(item.price[0], '')) * parseInt(item.quantity)}</td>
                <td class="orders-actions">
                   <i class="fa-solid fa-check accepted-btn"></i>
                   <i class="fa-solid fa-xmark rejected-btn"></i>
                </td>
            `;
            cartBody.appendChild(itemEl);
        });
    }
    function updateCartCount() {
        const countEl = document.querySelector('.total-orders');
        if (!countEl) return;
        const totalItems = cart.reduce((sum, p) => sum + (Number(p.quantity) || 0), 0);
        countEl.textContent = totalItems;
    }

    if (cart == null || cart.length === 0) {
        const itemEl = document.createElement("tr");
        itemEl.innerHTML = `<td colspan="6" class="empty-cart">No items in the cart</td>`;
        cartBody.appendChild(itemEl);
    } else {
        renderCart();
    }
    updateCartCount();


    //accepted button functionality
    let acceptedBtns = document.querySelectorAll(".accepted-btn");
    let rejectedBtns = document.querySelectorAll(".rejected-btn");
    let previousOrders = JSON.parse(localStorage.getItem("previousOrders")) || [];
    let products = JSON.parse(localStorage.getItem("products")) || [];

    acceptedBtns.forEach((item) => {
        item.addEventListener("click", (e) => {
            item.nextElementSibling.style.display = "none"
            console.log("accepted")
            console.log(e.target.parentElement.parentElement.querySelector(".client-name").textContent);
            let order = {
                currentUser: {
                    name: e.target.parentElement.parentElement.querySelector(".client-name").textContent
                },
                name: e.target.parentElement.parentElement.querySelector(".name").textContent,
                price: e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent,
                quantity: e.target.parentElement.previousElementSibling.previousElementSibling.textContent,
                imageSrc: e.target.parentElement.parentElement.querySelector("img").src,
                currentUser: currentUser,
            };
            previousOrders.push(order);
            localStorage.setItem("previousOrders", JSON.stringify(previousOrders));

            cart.forEach((product) => {
                if (product.name == order.name) {
                    cart = cart.filter(item => item.name !== order.name);
                    localStorage.setItem("cart", JSON.stringify(cart));
                }
            });
            // window.location.reload();
        });
        localStorage.setItem("cart", JSON.stringify(cart));
    });


    //rejected button functionality
    rejectedBtns.forEach((item) => {
        item.addEventListener("click", (e) => {
            window.location.reload();
            let name = e.target.parentElement.parentElement.querySelector(".name").textContent;
            let quantity = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
            products.forEach((product) => {
                if (product.name == name) {
                    product.quantity += parseInt(quantity);
                    localStorage.setItem("products", JSON.stringify(products));
                }
            })
            cart.forEach((product) => {
                if (product.name == name) {
                    cart = cart.filter(item => item.name !== name);
                }
            })
            localStorage.setItem("cart", JSON.stringify(cart));
            localStorage.setItem("products", JSON.stringify(products));

        });
    });
});



//accepted orders display
document.addEventListener("DOMContentLoaded", () => {
    const prevBody = document.querySelector(".prev-orders-items");
    let acceptedOrders = JSON.parse(localStorage.getItem("previousOrders")) || [];

    function renderCart() {
        acceptedOrders.forEach((item) => {
            // console.log(item.currentUser.name);
            const itemEl = document.createElement("tr");
            itemEl.innerHTML = `
        <td>${item.currentUser ? item.currentUser.name : "Unknown"}</td>
        <td class="orders-product-cell">
            <img src=${item.imageSrc} alt="Golden Glow">
            <span class="name">${item.name}</span>
        </td>
        <td>${item.price}</td>
        <td>${item.quantity}</td>
        <td>$${parseFloat(item.price.replace(item.price[0], '')) * parseInt(item.quantity)}</td>
        
    `;
            prevBody.appendChild(itemEl);
        });

    }
    function updateAcceptedOrdersCount() {
        const countEl = document.querySelector('.total-orders-accepted');
        if (!countEl) return;
        const totalItems = acceptedOrders.reduce((sum, p) => sum + (Number(p.quantity) || 0), 0);
        countEl.textContent = totalItems;
    }
    function updateAcceptedOrdersPrice() {
        const countEl = document.querySelector('.total-price-accepted');
        if (!countEl) return;
        const totalItemsPrice = acceptedOrders.reduce((sumPrice, product) => sumPrice + (parseFloat(product.quantity) * parseFloat(product.price.replace(product.price[0], '')) || 0), 0);
        countEl.textContent = `$${totalItemsPrice.toFixed(2)}`;
    }
    updateAcceptedOrdersCount();
    updateAcceptedOrdersPrice();
    if (acceptedOrders == null || acceptedOrders.length === 0) {
        const itemEl = document.createElement("tr");
        itemEl.innerHTML = `<td colspan="5" class="empty-accepted -orders">No items in the Accepted Orders</td>`;
        prevBody.appendChild(itemEl);
    } else {
        renderCart();
    }
});
