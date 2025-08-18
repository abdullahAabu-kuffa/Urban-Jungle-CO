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
                cartOrders.classList.add("appeared");
            }
        });
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


// Functionality to remove the cart orders when scrolling
document.addEventListener("DOMContentLoaded", () => {
    const cartOrders = document.querySelector(".cart-orders");
    window.addEventListener("scroll", () => {
        if (cartOrders && cartOrders.classList.contains("appeared")) {
            cartOrders.classList.remove("appeared");
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

            const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
            if (!currentUser) {
                window.location.replace("html/login.html");
            }
            else {
                const productData = { name, price, category, imageSrc, quantity, currentUser };
                const existingProduct = cart.find(item => item.name === name);
                if (existingProduct) {
                    existingProduct.quantity += 1;
                } else {
                    cart.push(productData);
                }
                localStorage.setItem("cart", JSON.stringify(cart));
                updateCartCount();
                window.location.reload();
            }
        });
    });
});

//for home and shop
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
            window.location.replace(`/html/product-details.html?name=${encodeURIComponent(name)}&price=${encodeURIComponent(price)}&category=${encodeURIComponent(category)}&imageSrc=${encodeURIComponent(imageSrc)}`);
        });
    });
});




// Functionality to render cart items and handle their removal
// cart-utils.js
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {
    const countEl = document.querySelector('.count-orders');
    if (!countEl) return;
    const totalItems = cart.reduce((sum, p) => sum + (Number(p.quantity) || 0), 0);
    countEl.textContent = totalItems;
}

function updateTotalPrice() {
    const sumPrice = document.querySelector(".sum");
    if (!sumPrice) return;
    let total = 0;
    cart.forEach(item => {
        const cleanPrice = parseFloat(item.price.replace(/[^0-9.]/g, "")) || 0;
        total += cleanPrice * parseFloat(item.quantity || 0);
    });
    sumPrice.textContent = `$${total.toFixed(2)}`;
}

function renderCart() {
    const cartContainer = document.querySelector(".cart-orders-items");
    if (!cartContainer) return;

    const emptyMsg = cartContainer.querySelector(".empty-cart");
    cartContainer.querySelectorAll(".cart-orders-item").forEach(el => el.remove());

    if (cart.length === 0) {
        if (emptyMsg) emptyMsg.style.display = "block";
        return;
    } else {
        if (emptyMsg) emptyMsg.style.display = "none";
    }

    cart.forEach(item => {
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
            const name = itemEl.querySelector(".name").textContent;
            cart = cart.filter(p => p.name !== name);
            localStorage.setItem("cart", JSON.stringify(cart));
            renderCart();
            updateCartCount();
            updateTotalPrice();
        });

        cartContainer.appendChild(itemEl);
    });
}

// Initialize on every page load
document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    updateTotalPrice();
    renderCart();
});



//Check out Cart orders
document.addEventListener("DOMContentLoaded", () => {
    const checkOutBtn = document.querySelector(".check-out");
    if (checkOutBtn) {
        checkOutBtn.addEventListener("click", (e) => {
            e.preventDefault();
            window.location.replace("../html/checkout.html");
        });
    }
});


// functionallity to load product after adding it from the admin dashboard for shop
document.addEventListener("DOMContentLoaded", () => {
    const productContainer = document.querySelector(".products-container");
    let products = JSON.parse(localStorage.getItem("products")) || [];

    // Show results count
    if (products.length > 0) {
        const resultsInfo = document.querySelector('.show');
        if (resultsInfo) {
            resultsInfo.innerHTML = `Showing all ${products.length} results`;
        }
    }

    // Render products
    function renderProducts() {
        if (!productContainer) return;

        // Clear default/static content
        productContainer.innerHTML = "";

        if (products.length === 0) {
            productContainer.innerHTML = "<p class='no-products'>No products available</p>";
            return;
        }

        products.forEach(product => {
            const productEl = document.createElement("a");
            productEl.classList.add("col-prodact");
            productEl.innerHTML = `
                <div class="image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="title-img">
                    <ul>
                        <li><i class="fa-regular fa-star"></i></li>
                        <li><i class="fa-regular fa-star"></i></li>
                        <li><i class="fa-regular fa-star"></i></li>
                        <li><i class="fa-regular fa-star"></i></li>
                        <li><i class="fa-regular fa-star"></i></li>
                    </ul>
                    <h5 class="name">${product.name}</h5>
                    <p class="category">${product.category}</p>
                    <p class="price">${product.price}</p>
                    <p class="quantity">Stock: ${product.quantity}</p>
                    <i class="fa-solid fa-cart-plus add-to-cart-icon">
                        <div class="add-to-cart">Add to cart</div>
                    </i>
                </div>
            `;
            productContainer.appendChild(productEl);
        });

        // Bind click + cart events
        bindProductEvents();
    }

    // Attach events (details + add-to-cart)
    function bindProductEvents() {
        // Product details navigation
        document.querySelectorAll(".col-prodact").forEach(product => {
            product.addEventListener("click", (e) => {
                e.preventDefault();
                const name = product.querySelector(".name").textContent;
                const price = product.querySelector(".price").textContent;
                const category = product.querySelector(".category").textContent;
                const imageSrc = product.querySelector("img").src;

                window.location.href = `/html/product-details.html?name=${encodeURIComponent(name)}&price=${encodeURIComponent(price)}&category=${encodeURIComponent(category)}&imageSrc=${encodeURIComponent(imageSrc)}`;
            });
        });

        // Add-to-cart click
        document.querySelectorAll(".add-to-cart-icon").forEach((btn) => {
            btn.addEventListener("click", function (e) {
                e.preventDefault();
                e.stopPropagation(); // stop product-details navigation

                const product = btn.closest(".col-prodact");
                const name = product.querySelector(".name").textContent;
                const price = product.querySelector(".price").textContent;
                const category = product.querySelector(".category").textContent;
                const imageSrc = product.querySelector("img").src;
                const quantity = 1;

                const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
                if (!currentUser) {
                    window.location.replace("html/login.html");
                    return;
                }

                let cart = JSON.parse(localStorage.getItem("cart")) || [];

                const existingProduct = cart.find(item => item.name === name && item.currentUser === currentUser);
                if (existingProduct) {
                    existingProduct.quantity += 1;
                } else {
                    cart.push({ name, price, category, imageSrc, quantity, currentUser });
                }

                localStorage.setItem("cart", JSON.stringify(cart));
                // updateCartCount();
                window.location.reload();
            });
        });
    }

    // Update cart count in header/badge
    function updateCartCount() {
        const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const count = cart.filter(item => item.currentUser === currentUser)
            .reduce((acc, item) => acc + item.quantity, 0);

        const cartCountEl = document.querySelector(".cart-count");
        if (cartCountEl) {
            cartCountEl.textContent = count;
        }
    }

    // Initial load
    renderProducts();
    updateCartCount();
});







//home 

document.addEventListener("DOMContentLoaded", () => {
    const productContainer = document.querySelector(".products-container-home");
    let products = JSON.parse(localStorage.getItem("products")) || [];
    let filteredProducts = products.slice(0, 3);
    if (productContainer && (filteredProducts.length === 0 || !filteredProducts)) {
        return;
    }
    function renderProducts() {
        if (!productContainer) return;
        productContainer.innerHTML = "";
        filteredProducts.forEach(product => {
            const productEl = document.createElement("a");
            productEl.classList.add("col-prodact");
            productEl.innerHTML = `
                <div class="image">
                <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="title-img">
                        <ul>
                            <li><i class="fa-regular fa-star"></i></li>
                        </ul>
                        <h5 class="name">${product.name}</h5>
                        <p class="category">${product.category}</p>
                        <p class="price">${product.price}</p>
                        <p class="quantity">Stock:${product.quantity} </p>
                        <i class="fa-solid fa-cart-plus add-to-cart-icon">
                    <div class="add-to-cart">Add to cart</div>
                             </i>
                    </div>
                `;
            productContainer.appendChild(productEl);

        });
    }
    renderProducts();
    const productLinks = document.querySelectorAll(".col-prodact");
    productLinks.forEach(product => {
        product.addEventListener("click", (e) => {
            e.preventDefault();
            let quantityText = product.querySelector('.quantity').textContent;
            const clickedProduct = {
                name: product.querySelector(".name").textContent,
                price: product.querySelector(".price").textContent,
                category: product.querySelector(".category").textContent,
                image: product.querySelector("img").src,
                quantity: quantityText.replace("Stock:", "").trim()
            };
            localStorage.setItem("selectedProduct", JSON.stringify(clickedProduct));
            window.location.href = "/html/product-details.html";
        });
    });

});

// localStorage.removeItem("previousOrders");

