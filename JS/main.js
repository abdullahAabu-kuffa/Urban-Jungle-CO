// This holds the logged-in user
document.addEventListener('DOMContentLoaded', () => {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser) {
        document.querySelector('.is-logged').innerHTML = 'Profile';
        document.querySelector('.is-logged').addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = '../html/profile.html';
        });
    } else {
        document.querySelector('.is-logged').innerHTML = 'Login';
    }
});

// Function to toggle the navigation bar visibility
const navBar = document.getElementById("nav-bar-id");
const menuBtn = document.querySelector(".menu-btn");
const closeBtn = document.querySelector(".close-btn");
menuBtn.addEventListener("click", () => {
    navBar.style.display = "flex";
    menuBtn.style.display = "none";
    closeBtn.style.display = "block";

});
// This function handles the close button click event to hide the navigation bar
closeBtn.addEventListener("click", () => {
    navBar.style.display = "none";
    closeBtn.style.display = "none";
    menuBtn.style.display = "block";
});


// Back to Top Button Functionality
const btn = document.querySelector('.back-to-top');
if (btn) {
    window.addEventListener('scroll', () => {
        btn.style.display = window.scrollY > 200 ? 'flex' : 'none';
    });
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
        });
    });
}

// Highlighting the active navigation link based on the current page
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        if (link.getAttribute('href').split('/').pop() == currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// Adding a border to the filter button when clicked
let isBordered = false;
const selectFilter = document.getElementById(".filter-products");
if (selectFilter) {
    selectFilter.addEventListener("click", function (e) {
        e.preventDefault();
        isBordered = !isBordered;
        selectFilter.style.border = isBordered ? "1px dashed var(--main-font-color)" : "none";
    });
}

// Cart functionality to show and hide cart orders
document.addEventListener('DOMContentLoaded', () => {
    const cartOnClick = document.querySelector(".cart-on-click");
    if (cartOnClick) {
        cartOnClick.addEventListener("click", () => {
            const cartOrders = document.querySelector(".cart-orders");
            if (cartOrders) {
                cartOrders.classList.add("appeared"); // hides the cart panel
            }
        });
    }
});
document.addEventListener('DOMContentLoaded', () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const sumPrice = document.querySelector(".sum");
    let total = 0;
    cart.forEach(item => {
        total += parseFloat(item.price.replace(item.price[0], '')) * parseInt(item.quantity);
    });
    if (sumPrice) {
        sumPrice.textContent = `$${total}`;
    }
});


// Functionality to close the cart orders when the close button is clicked
document.addEventListener('DOMContentLoaded', () => {
    const closeOrdersBtn = document.querySelector(".close-orders-btn");
    if (closeOrdersBtn) {
        closeOrdersBtn.addEventListener("click", () => {
            const cartOrders = document.querySelector(".cart-orders");
            if (cartOrders) {
                cartOrders.classList.remove("appeared");
            }
        });
    }
});


document.addEventListener("DOMContentLoaded", () => {
    const cartOrders = document.querySelector(".cart-orders");

    // Listen to scroll events
    window.addEventListener("scroll", () => {
        if (cartOrders && cartOrders.classList.contains("appeared")) {
            cartOrders.classList.remove("appeared"); // hides the cart panel
        }
    });
});


// Functionality to add products to the cart
document.addEventListener('DOMContentLoaded', () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || []

    function updateCartCount() {
        const countEl = document.querySelector('.count-orders');
        if (!countEl) return;
        const totalItems = cart.reduce((sum, p) => sum + (Number(p.quantity) || 0), 0);
        countEl.textContent = totalItems;
    }
    updateCartCount();

    document.querySelectorAll(".add-to-cart-icon").forEach((btn) => {
        btn.addEventListener("click", function (e) {

            e.preventDefault();
            e.stopPropagation();

            const product = btn.closest(".col-prodact");

            const name = product.querySelector(".name").textContent;
            const price = product.querySelector(".price").textContent;
            const category = product.querySelector(".category").textContent;
            const imageSrc = product.querySelector("img").src;
            const quantityInput = product.querySelector(".quantity");
            const quantity = quantityInput ? Number(quantityInput.value) || 1 : 1;
            const productData = { name, price, category, imageSrc, quantity };

            const existingProduct = cart.find(item => item.name === name);

            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push(productData);
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartCount();
        });
    });

    if (document.querySelector(".add-to-cart-button")) {
        const btn = document.querySelector(".add-to-cart-button");
        btn.addEventListener("click", function () {

            const product = btn.closest(".product-container");

            const name = product.querySelector(".name").textContent;
            const price = product.querySelector(".price").textContent;
            const category = product.querySelector(".category").textContent;
            const imageSrc = product.querySelector(".pro-img").src;
            const quantityInput = product.querySelector("input[type='number']");
            const quantity = parseInt(quantityInput.value);

            const productData = { name, price, category, imageSrc, quantity };

            const existingProduct = cart.find(item => item.name === name);
            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                cart.push(productData);
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartCount();
        });
    }
    // console.log(JSON.parse(localStorage.getItem("cart")));
});
//localStorage.clear();



// Functionality to redirect to product details page when a product is clicked
document.addEventListener('DOMContentLoaded', () => {
    const productLinks = document.querySelectorAll(".col-prodact");
    productLinks.forEach(product => {
        product.addEventListener("click", (e) => {
            e.preventDefault();

            const name = product.querySelector(".name").textContent;
            const price = product.querySelector(".price").textContent;
            const category = product.querySelector(".category").textContent;
            const imageSrc = product.querySelector("img").src;

            window.location.href = `/html/product-details.html?name=${name}&price=${price}&category=${category}&imageSrc=${imageSrc}`;
        });
    });
});

//read product details from URL parameters and display them
document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);

    const name = params.get("name");
    const price = params.get("price");
    const category = params.get("category");
    const imageSrc = params.get("imageSrc");

    document.querySelector(".name").textContent = name;
    document.querySelector(".price").textContent = price;
    const categoryEl = document.querySelector(".category");
    if (categoryEl) {
        categoryEl.textContent = category;
    }
    if (document.querySelector(".pro-img")) {
        document.querySelector(".pro-img").src = imageSrc;
    }
});


// Functionality to render cart items and handle their removal
document.addEventListener("DOMContentLoaded", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const cartContainer = document.querySelector(".cart-orders-items");
    const emptyMsg = cartContainer.querySelector(".empty-cart");

    function renderCart() {

        cartContainer.querySelectorAll(".cart-orders-item").forEach(el => el.remove());

        if (cart.length === 0) {
            emptyMsg.style.display = "block";
            return;
        } else {
            emptyMsg.style.display = "none";
        }

        cart.forEach((item, index) => {
            const itemEl = document.createElement("div");
            itemEl.classList.add("cart-orders-item");
            itemEl.innerHTML = `
                <div class="cart-orders-item-info">
                    <img src="${item.imageSrc}" width="60" height="60" alt="">
                    <div>
                        <div class="name">${item.name}</div>
                        <span class="quantity">${item.quantity}</span>
                        <span class="x">x</span>
                        <span class="price">${item.price}</span>
                    </div>
                </div>
                <div class="pending">pending</div>
                <button class="cancel-order"><i class="fa-solid fa-times"></i></button>
            `;


            itemEl.querySelector(".cancel-order").addEventListener("click", () => {
                cart.splice(index, 1);
                localStorage.setItem("cart", JSON.stringify(cart));
                renderCart();
                updateCounter();
            });

            cartContainer.appendChild(itemEl);
        });
    }

    function updateCounter() {
        const countEl = document.querySelector(".count-orders");
        const totalItems = cart.reduce((sum, p) => sum + (Number(p.quantity) || 0), 0);
        if (countEl) countEl.textContent = totalItems;
    }

    renderCart();
    updateCounter();
});

