// This holds the logged-in user
document.addEventListener('DOMContentLoaded', () => {

    if (currentUser) {
        document.querySelector('.is-logged').innerHTML = 'Profile';
        document.querySelector('.is-logged').addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = '../html/profile.html';
        });
    } else {
        const el = document.querySelector(".is-logged");
        if (el) {
            el.innerHTML = "Login";
        }
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



//current user 



//fetch products data from json 
document.addEventListener("DOMContentLoaded", function () {

    async function loadProducts() {
        try {
            const response = await fetch('https://urban-jungle-products.netlify.app/products.json');

            if (!response.ok) throw new Error('Network response was not ok');

            const data = await response.json();
            const productList = Array.isArray(data) ? data : Object.values(data.products)

            localStorage.setItem('products', JSON.stringify(productList));

        } catch (error) {
            console.error('Error fetching JSON:', error);
            return [];
        }
    }

    // Usage:
    if (!localStorage.getItem('products'))
        loadProducts();
})

// read the date form local storage

export const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
export let cart = JSON.parse(localStorage.getItem("cart")) || [];
export let products = JSON.parse(localStorage.getItem("products")) || [];
export let wishList = JSON.parse(localStorage.getItem("wishList")) || [];


// const functions 

// Update cart of user count in header/badge
export function updateCartCount() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
    let countPending = 0;
    if (currentUser) {
        countPending = cart
            .filter(item => item.currentUser && item.currentUser.email === currentUser.email)
            .reduce((acc, item) => acc + Number(item.quantity), 0);
    }
    const cartCountEl = document.querySelector(".count-orders");
    if (cartCountEl) {
        cartCountEl.textContent = countPending;
    }
}


export function updateTotalPrice() {
    const sumPrice = document.querySelector(".sum-pending");
    if (sumPrice) {
        let total = 0;
        cart.forEach(item => {
            const cleanPrice = parseFloat(item.price.replace(/[^0-9.]/g, "")) || 0;
            total += cleanPrice * parseFloat(item.quantity || 0);
        });
        sumPrice.textContent = `$${total.toFixed(2)}`;
    }
}

export function showAlert(message, bgColor) {
    const alertBox = document.getElementById("custom-alert");
    const alertMessage = document.getElementById("alert-message");
    alertBox.style.backgroundColor = bgColor;
    alertMessage.textContent = message;
    alertBox.classList.remove("hidden");
}

export function closeAlert() {
    document.getElementById("custom-alert").classList.add("hidden");
}



// Functionality to render cart items and handle their removal
export function renderCart() {
    const cartContainer = document.querySelector(".cart-orders-items");

    if (!cartContainer || !currentUser) return;

    const emptyMsg = cartContainer.querySelector(".empty-cart");
    cartContainer.querySelectorAll(".cart-orders-item").forEach(el => el.remove());

    if (cart.length === 0) {
        if (emptyMsg) emptyMsg.style.display = "block";
        return;
    } else {
        if (emptyMsg) emptyMsg.style.display = "none";
    }

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
            const quantityInput = itemEl.querySelector(".quantity").textContent;
            const quantity = quantityInput ? Number(quantityInput) || 1 : 1;

            cart = cart.filter(p => p.name !== name);
            localStorage.setItem("cart", JSON.stringify(cart));

            products.forEach((product) => {
                if (product.name == name) {
                    product.quantity += quantity;
                }
            })
            localStorage.setItem("products", JSON.stringify(products));

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



//Check out Cart accepted orders
document.addEventListener("DOMContentLoaded", () => {
    const checkOutBtn = document.querySelector(".check-out");
    if (checkOutBtn) {
        checkOutBtn.addEventListener("click", (e) => {
            e.preventDefault();
            window.location.replace("../html/checkout.html");
        });
    }
});


//read products in home page
document.addEventListener("DOMContentLoaded", () => {

    const productContainer = document.querySelector(".products-container-home");
    let products = JSON.parse(localStorage.getItem("products")) || [];
    let filteredProducts = products.slice(0, 3);

    // Render products
    function renderProducts() {

        if (!productContainer || filteredProducts.length === 0) return;

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

                let quantityInput = product.querySelector('.quantity').textContent;
                const quantity = quantityInput ? Number(quantityInput) || 1 : 1;
                let name = product.querySelector(".name").textContent;
                let description;

                products.forEach((item) => {
                    if (item.name == name) {
                        description = item.description;
                    }
                });

                const clickedProduct = {
                    name: name,
                    price: product.querySelector(".price").textContent,
                    category: product.querySelector(".category").textContent,
                    image: product.querySelector("img").src,
                    quantity: quantity,
                    description: description,
                };
                // Save selected product for details page
                localStorage.setItem("clickedProduct", JSON.stringify(clickedProduct));
                window.location.href = "../html/product-details.html";
            });
        });

        // Add to cart button

        document.querySelectorAll(".add-to-cart-icon").forEach((btn) => {
            btn.addEventListener("click", function (e) {
                e.preventDefault();
                e.stopPropagation(); // stop product-details navigation

                if (!currentUser) {
                    window.location.replace("html/login.html");
                    return;
                }

                const product = btn.closest(".col-prodact");
                const name = product.querySelector(".name").textContent;
                const price = product.querySelector(".price").textContent;
                const category = product.querySelector(".category").textContent;
                const imageSrc = product.querySelector("img").src;
                const quantity = 1;

                // check logged in user

                let isQuentaty = false;
                let proQuantity;
                products.forEach((product) => {
                    if (product.name == name) {
                        proQuantity = product.quantity;
                        if (product.quantity >= quantity) {
                            product.quantity -= quantity;
                            isQuentaty = true;
                        }
                    }
                })

                if (!isQuentaty) {
                    showAlert(`The Stock is ${proQuantity} Product Only!`, '#b11111ff')
                    setTimeout(() => closeAlert(), 2000);
                    return;
                }
                else {
                    showAlert(`Done!`, "#779c26")
                    setTimeout(() => closeAlert(), 2000);
                }


                const existingProduct = cart.find(item => item.name === name);
                if (existingProduct) {
                    existingProduct.quantity += 1;
                } else {
                    cart.push({ name, price, category, imageSrc, quantity, currentUser });
                }

                const quantityElem = product.querySelector('.quantity');
                if (quantityElem) {
                    // Find the updated product in products array
                    const updatedProduct = products.find(p => p.name === name);
                    if (updatedProduct) {
                        quantityElem.textContent = `Stock: ${updatedProduct.quantity}`;
                    }
                }

                localStorage.setItem("cart", JSON.stringify(cart));
                localStorage.setItem("products", JSON.stringify(products));

                updateCartCount();
                renderCart();
            });

        });

    }

    // Initial load
    renderProducts();
    updateCartCount();
});


//wish list

export function addToWisList() {
    document.addEventListener('DOMContentLoaded', () => {
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

                if (!currentUser) {
                    localStorage.removeItem('currentAdmin')
                    window.location.href = "../html/login.html";
                    return;
                }
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
}
addToWisList();
// localStorage.removeItem('cart');
// localStorage.removeItem('users');
// localStorage.removeItem('previousOrders');
// localStorage.removeItem('currentUser');




