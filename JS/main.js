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
        total += parseFloat(item.price.replace(item.price[0], '')) * parseFloat(item.quantity);
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
            window.location.reload();
        });
    }
});


document.addEventListener("DOMContentLoaded", () => {
    const cartOrders = document.querySelector(".cart-orders");
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
            console.log("Add to cart clicked");
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
                window.location.reload(); // Reload the page to update the cart count
            }
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
            const quantity = quantityInput ? Number(quantityInput.value) || 1 : 1;
            const currentUser = JSON.parse(localStorage.getItem("currentUser"));
            if (!currentUser) {
                window.location.replace("login.html");
            }
            else {
                const productData = { name, price, category, imageSrc, quantity, currentUser };

                const existingProduct = cart.find(item => item.name === name);
                if (existingProduct) {
                    existingProduct.quantity += quantity;
                } else {
                    cart.push(productData);
                }

                localStorage.setItem("cart", JSON.stringify(cart));
                updateCartCount();
                window.location.reload();
            }
        });
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




// functionallity to load product after adding it from the admin dashboard for shop
document.addEventListener("DOMContentLoaded", () => {
    const productContainer = document.querySelector(".products-container");
    let products = JSON.parse(localStorage.getItem("products")) || [];
    document.querySelector('.show').innerHTML = `Showing all ${products.length} results`;
    let product = {
        name: "Breez",
        price: "$100.00",
        category: "Indoor Plants",
        imageSrc: "../images/home/product1.jpg",
        quantity: 1
    }
    // products.push(product);
    // localStorage.setItem("products", JSON.stringify(products));
    if (products.length === 0) {
        productContainer.innerHTML = "<p style='color:black;'>No products available</p>";
    }

    function renderProducts() {
        productContainer.innerHTML = "";
        products.forEach(product => {
            const productEl = document.createElement("a");
            productEl.classList.add("col-prodact");
            // productEl.href = `../html/product-details.html?name=${product.name}&price=${product.price}&category=${product.category}&imageSrc=${product.imageSrc}`;
            // productEl.style.textDecoration = "none";
            productEl.innerHTML = `
                <div class="image">
                <img src="${product.imageSrc}" alt="${product.name}">
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
                        <p class="quantity">Stock:${product.quantity}</p>
                        <i class="fa-solid fa-cart-plus add-to-cart-icon">
                    <div class="add-to-cart">Add to cart</div>
                </i>
                    </div>
                `;
            productContainer.appendChild(productEl);
            
        });
        const productLinks = document.querySelectorAll(".col-prodact");
        productLinks.forEach(product => {
            product.addEventListener("click", (e) => {
                e.preventDefault();
                const name = product.querySelector(".name").textContent;
                const price = product.querySelector(".price").textContent;
                const category = product.querySelector(".category").textContent;
                const imageSrc = product.querySelector("img").src;
                window.location.href = `/html/product-details.html?name=${encodeURIComponent(name)}&price=${encodeURIComponent(price)}&category=${encodeURIComponent(category)}&imageSrc=${encodeURIComponent(imageSrc)}`;

            });
        });
    }
    renderProducts();
});






//home


document.addEventListener("DOMContentLoaded", () => {
    const productContainer = document.querySelector(".products-container-home");
    let products = JSON.parse(localStorage.getItem("products")) || [];
    let filteredProducts = products.slice(0, 3);
    console.log(filteredProducts);
    // let product = {
    //     name: "Breez",
    //     price: "$100.00",
    //     category: "Indoor Plants",
    //     imageSrc: "../images/home/product1.jpg",
    //     quantity: 1
    // }
    // products.push(product);
    // localStorage.setItem("products", JSON.stringify(products));
    if (filteredProducts.length === 0) {
        productContainer.innerHTML = "<p style='color:black;'>No products available</p>";
        return;
    }

    function renderProducts() {
        productContainer.innerHTML = "";
        filteredProducts.forEach(product => {
            const productEl = document.createElement("a");
            productEl.classList.add("col-prodact");
            // productEl.href = `../html/product-details.html?name=${product.name}&price=${product.price}&category=${product.category}&imageSrc=${product.imageSrc}`;
            // productEl.style.textDecoration = "none";
            productEl.innerHTML = `
                <div class="image">
                <img src="${product.imageSrc}" alt="${product.name}">
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
                        <p class="quantity">Stock:${product.quantity}</p>
                        <i class="fa-solid fa-cart-plus add-to-cart-icon">
                    <div class="add-to-cart">Add to cart</div>
                </i>
                    </div>
                `;
            productContainer.appendChild(productEl);

        });
        const productLinks = document.querySelectorAll(".col-prodact");
        productLinks.forEach(product => {
            product.addEventListener("click", (e) => {
                e.preventDefault();
                const name = product.querySelector(".name").textContent;
                const price = product.querySelector(".price").textContent;
                const category = product.querySelector(".category").textContent;
                const imageSrc = product.querySelector("img").src;
                window.location.href = `/html/product-details.html?name=${encodeURIComponent(name)}&price=${encodeURIComponent(price)}&category=${encodeURIComponent(category)}&imageSrc=${encodeURIComponent(imageSrc)}`;

            });
        });
    }

    renderProducts();
});