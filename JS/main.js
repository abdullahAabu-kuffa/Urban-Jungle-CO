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
const selectFilter = document.getElementById("filter-products");
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
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let products = JSON.parse(localStorage.getItem("products")) || [];

    function updateCartCount() {
        const countEl = document.querySelector('.count-orders');
        if (!countEl) return;
        const totalItems = cart.reduce((sum, p) => sum + (Number(p.quantity) || 0), 0);
        countEl.textContent = totalItems;
    }

    updateCartCount(); // run once on page load

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

            products.forEach((product) => {
                if (product.name === name) {
                    if (product.quantity < quantity)
                        showAlert(`The Stock is ${product.quantity} Product`)
                    setTimeout(() => closeAlert(), 5000);
                    return
                }
            });

            const productData = { name, price, category, imageSrc, quantity, currentUser };
            const existingProduct = cart.find(item => item.name === name);
            if (existingProduct) {
                existingProduct.quantity += 1;
                console.log("sdfjspofjsjf")
            } else {
                cart.push(productData);
            }
            localStorage.setItem("cart", JSON.stringify(cart));

            // just update cart count without reloading the page
            updateCartCount();

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
let previousOrders = JSON.parse(localStorage.getItem("previousOrders")) || [];

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

    const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
    if (!currentUser) {
        return;
    }

    const emptyMsg = cartContainer.querySelector(".empty-cart");
    cartContainer.querySelectorAll(".cart-orders-item").forEach(el => el.remove());

    if (cart.length === 0) {
        if (emptyMsg) emptyMsg.style.display = "block";
        return;
    } else {
        if (emptyMsg) emptyMsg.style.display = "none";
    }
    //Accepted Orders
    previousOrders.forEach(item => {
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
            <div class="accepted">accepted</div>
            <button class="cancel-order"><i class="fa-solid fa-times"></i></button>
        `;

        itemEl.querySelector(".cancel-order").addEventListener("click", () => {
            const name = itemEl.querySelector(".name").textContent;
            previousOrders = previousOrders.filter(p => p.name !== name);
            localStorage.setItem("previousOrders", JSON.stringify(previousOrders));
            renderCart();
            updateCartCount();
            updateTotalPrice();
        });

        cartContainer.appendChild(itemEl);
    });

    //pending Orders
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


// functionality to show products in the shop page
document.addEventListener("DOMContentLoaded", () => {
    const productContainer = document.querySelector(".products-container");
    const filterSelect = document.getElementById("filter-products"); // your dropdown
    let products = JSON.parse(localStorage.getItem("products")) || [];

    // Show results count
    if (products.length > 0) {
        const resultsInfo = document.querySelector('.show');
        if (resultsInfo) {
            resultsInfo.innerHTML = `Showing all ${products.length} results`;
        }
    }

    // Render products
    function renderProducts(list = products) {
        if (!productContainer) return;

        if (list.length === 0) {
            return;
        }
        productContainer.innerHTML = "";
        list.forEach(product => {
            const productEl = document.createElement("a");
            productEl.classList.add("col-prodact");
            productEl.innerHTML = `
                <div class="image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class = "to-flex">
                <div class="title-img">
                <h5 class="name">${product.name}</h5>
                <p class="category">${product.category}</p>
                <p class="price">$${product.price} </p>
                <i class="fa-solid fa-cart-plus add-to-cart-icon">
                <div class="add-to-cart">Add to cart</div>
                </i>
                </div>
                <div class = "wishlist">
                    <i class="fa-regular fa-star wishlist-click"></i>
                    <p class="quantity">Stock: ${product.quantity}</p>
                </div>
                </div>
            `;
            productContainer.appendChild(productEl);
        });

        bindProductEvents();
    }

    // Handle product clicks + cart
    function bindProductEvents() {
        // Navigate to product details
        document.querySelectorAll(".col-prodact").forEach(product => {
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

                // Save selected product for details page
                localStorage.setItem("selectedProduct", JSON.stringify(clickedProduct));
                window.location.href = "/html/product-details.html";
            });
        });

        // Add to cart button

        document.querySelectorAll(".add-to-cart-icon").forEach((btn) => {
            btn.addEventListener("click", function (e) {
                updateCartCount();

                e.preventDefault();
                e.stopPropagation(); // stop product-details navigation

                const product = btn.closest(".col-prodact");
                const name = product.querySelector(".name").textContent;
                const price = product.querySelector(".price").textContent;
                const category = product.querySelector(".category").textContent;
                const imageSrc = product.querySelector("img").src;

                // default quantity = 1 when added to cart
                const quantity = 1;

                // check logged in user
                const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
                if (!currentUser) {
                    window.location.replace("login.html");
                    return;
                }
                let isQuentaty = false;
                let proQuantity;
                products.forEach((product) => {
                    if (product.name == name) proQuantity = product.quantity;
                    if (product.name == name && product.quantity >= 1) {
                        product.quantity -= quantity;
                        isQuentaty = true;
                        localStorage.setItem("products", JSON.stringify(products));
                    }
                })
                if (!isQuentaty) {
                    showAlert(`The Stock is ${proQuantity} Product`)
                    setTimeout(() => closeAlert(), 5000);
                    return;
                }
                let cart = JSON.parse(localStorage.getItem("cart")) || [];

                const existingProduct = cart.find(item => item.name === name);
                if (existingProduct) {
                    existingProduct.quantity += 1;
                } else {
                    cart.push({ name, price, category, imageSrc, quantity, currentUser });
                }

                localStorage.setItem("cart", JSON.stringify(cart));
                localStorage.setItem("products", JSON.stringify(products));
                window.location.reload();
                updateCartCount();
            });
        });
    }
    function showAlert(message) {
        const alertBox = document.getElementById("custom-alert");
        const alertMessage = document.getElementById("alert-message");

        alertMessage.textContent = message;
        alertBox.classList.remove("hidden");
    }

    function closeAlert() {
        document.getElementById("custom-alert").classList.add("hidden");
    }
    // Update cart count in header/badge
    function updateCartCount() {
        const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const count = cart
            .filter(item => item.currentUser === currentUser)
            .reduce((acc, item) => acc + item.quantity, 0);

        const cartCountEl = document.querySelector(".cart-count");
        if (cartCountEl) {
            cartCountEl.textContent = count;
        }
    }

    // Filtering / Sorting logic
    function filterProducts() {
        let sortedProducts = [...products];

        switch (filterSelect.value) {
            case "category": // sort by category (A–Z)
                sortedProducts.sort((a, b) => a.category.localeCompare(b.category));
                break;
            case "price": // low to high
                sortedProducts.sort((a, b) =>
                    parseFloat(a.price.replace(/[^0-9.]/g, "")) -
                    parseFloat(b.price.replace(/[^0-9.]/g, ""))
                );
                break;
            case "price-desc": // high to low
                sortedProducts.sort((a, b) =>
                    parseFloat(b.price.replace(/[^0-9.]/g, "")) -
                    parseFloat(a.price.replace(/[^0-9.]/g, ""))
                );
                break;
            default: // default sort (by name)
                sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
        }
        renderProducts(sortedProducts);
    }
    // Initial load
    renderProducts();
    updateCartCount();
    //  Event for filter dropdown
    if (filterSelect) {
        filterSelect.addEventListener("change", filterProducts);
    }
});








//home 
document.addEventListener("DOMContentLoaded", () => {
    const productContainer = document.querySelector(".products-container-home");
    let products = JSON.parse(localStorage.getItem("products")) || [];
    let filteredProducts = products.slice(0, 3);

    // Render products
    function renderProducts() {
        if (!productContainer) return;

        if (filteredProducts.length === 0) {
            // productContainer.innerHTML = "<p class='no-products'>No products available</p>";
            return;
        }
        productContainer.innerHTML = "";

        filteredProducts.forEach(product => {
            const productEl = document.createElement("a");
            productEl.classList.add("col-prodact");
            productEl.innerHTML = `
                <div class="image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class = "to-flex">
                <div class="title-img">
                <h5 class="name">${product.name}</h5>
                <p class="category">${product.category}</p>
                <p class="price">$${product.price} </p>
                <i class="fa-solid fa-cart-plus add-to-cart-icon">
                <div class="add-to-cart">Add to cart</div>
                </i>
                </div>
                <div class = "wishlist">
                    <i class="fa-regular fa-star wishlist-click"></i>
                    <p class="quantity">Stock: ${product.quantity}</p>
                </div>
                </div>
            `;
            productContainer.appendChild(productEl);

        });

        bindProductEvents();
    }

    // Handle product clicks + cart
    function bindProductEvents() {
        // Navigate to product details
        document.querySelectorAll(".col-prodact").forEach(product => {
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
                // Save selected product for details page
                localStorage.setItem("selectedProduct", JSON.stringify(clickedProduct));
                window.location.href = "/html/product-details.html";
            });
        });

        // Add to cart button
        let products = JSON.parse(localStorage.getItem("products")) || [];

        document.querySelectorAll(".add-to-cart-icon").forEach((btn) => {
            btn.addEventListener("click", function (e) {
                e.preventDefault();
                e.stopPropagation(); // stop product-details navigation

                const product = btn.closest(".col-prodact");
                const name = product.querySelector(".name").textContent;
                const price = product.querySelector(".price").textContent;
                const category = product.querySelector(".category").textContent;
                const imageSrc = product.querySelector("img").src;

                // default quantity = 1 when added to cart
                const quantity = 1;

                // check logged in user
                const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
                if (!currentUser) {
                    window.location.replace("html/login.html");
                    return;
                }
                let isQuentaty = false;
                let proQuantity;
                products.forEach((product) => {
                    if (product.name == name) proQuantity = product.quantity;
                    if (product.name == name && product.quantity >= 1) {
                        product.quantity -= quantity;
                        isQuentaty = true;
                        localStorage.setItem("products", JSON.stringify(products));
                    }
                })
                if (!isQuentaty) {
                    console.log("saddsafsd");
                    showAlert(`The Stock is ${proQuantity} Product`)
                    setTimeout(() => closeAlert(), 50000);
                    return;
                }
                let cart = JSON.parse(localStorage.getItem("cart")) || [];

                const existingProduct = cart.find(item => item.name === name);
                if (existingProduct) {
                    existingProduct.quantity += 1;
                } else {
                    cart.push({ name, price, category, imageSrc, quantity, currentUser });
                }

                localStorage.setItem("cart", JSON.stringify(cart));
                localStorage.setItem("products", JSON.stringify(products));

                updateCartCount();
                window.location.reload();

            });
            function showAlert(message) {
                const alertBox = document.getElementById("custom-alert");
                const alertMessage = document.getElementById("alert-message");

                alertMessage.textContent = message;
                alertBox.classList.remove("hidden");
            }

            function closeAlert() {
                document.getElementById("custom-alert").classList.add("hidden");
            }
        });
    }

    // Update cart count in header/badge
    function updateCartCount() {
        const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const count = cart
            .filter(item => item.currentUser === currentUser)
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
// localStorage.removeItem("previousOrders");


//wish list
document.addEventListener("DOMContentLoaded", () => {
    let wishList = JSON.parse(localStorage.getItem("wishList")) || [];

    const wishListClick = document.querySelectorAll(".wishlist-click");

    wishListClick.forEach((wish) => {
        const productElement = wish.closest(".col-prodact");
        const productName = productElement.querySelector(".name").textContent;

        if (wishList.some(item => item.name === productName)) {
            wish.style.color = "#f8f403ff";
        } else {
            wish.style.color = "";
        }

        wish.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();

            const order = {
                name: productName,
                price: productElement.querySelector(".price").textContent,
                quantity: productElement.querySelector(".quantity").textContent,
                imageSrc: productElement.querySelector("img").src
            };


            const exists = wishList.some(item => item.name === order.name);

            if (!exists) {
                wishList.push(order);
                wish.style.color = "#f8f403ff";
            } else {
                wishList = wishList.filter(item => item.name !== order.name);
                wish.style.color = "";
            }

            localStorage.setItem("wishList", JSON.stringify(wishList));
        });
    });
});
