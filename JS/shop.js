// Adding a border to the filter button when clicked

import { addToWisList, updateCartCount, renderCart, showAlert, closeAlert } from "./main.js";
import { cart, products, currentUser } from "./main.js";


let isBordered = false;
const selectFilter = document.getElementById("filter-products");
if (selectFilter) {
    selectFilter.addEventListener("click", function (e) {
        e.preventDefault();
        isBordered = !isBordered;
        selectFilter.style.border = isBordered ? "1px dashed var(--main-font-color)" : "none";
    });
}


// functionality to show products in the shop page
document.addEventListener("DOMContentLoaded", () => {

    const productContainer = document.querySelector(".products-container");
    const filterSelect = document.getElementById("filter-products"); // your dropdown

    if (products.length > 0) {
        const resultsInfo = document.querySelector('.show');
        if (resultsInfo) {
            resultsInfo.innerHTML = `Showing all ${products.length} results`;
        }
    }

    // Render products
    function renderProducts(list = products) {

        if (!productContainer || list.length === 0) return;

        productContainer.innerHTML = "";
        list.forEach(product => {
            const productEl = document.createElement("a");
            productEl.classList.add("col-prodact");
            productEl.innerHTML = `
                <div class="image">
                    <img src="../${product.image}" alt="${product.name}">
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

                let description;
                products.forEach((item) => {
                    if (item.name == product.querySelector(".name").textContent) {
                        description = item.description;
                    }
                });

                let quantityText = product.querySelector('.quantity').textContent;
                const clickedProduct = {
                    name: product.querySelector(".name").textContent,
                    price: product.querySelector(".price").textContent,
                    category: product.querySelector(".category").textContent,
                    image: product.querySelector("img").src,
                    quantity: quantityText.replace("Stock:", "").trim(),
                    description: description
                };

                // Save selected product for details page
                localStorage.setItem("clickedProduct", JSON.stringify(clickedProduct));
                window.location.href = "../html/product-details.html";
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
                if (!currentUser) {
                    window.location.replace("login.html");
                    return;
                }
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
                    showAlert(`Done!`, '#779c26')
                    setTimeout(() => closeAlert(), 2000);
                }

                const existingProduct = cart.find(item => item.name === name);
                if (existingProduct) {
                    existingProduct.quantity += 1;
                } else {
                    cart.push({ name, price, category, imageSrc, quantity, currentUser });
                }

                localStorage.setItem("cart", JSON.stringify(cart));
                localStorage.setItem("products", JSON.stringify(products));

                const quantityElem = product.querySelector('.quantity');
                if (quantityElem) {
                    // Find the updated product in products array
                    const updatedProduct = products.find(p => p.name === name);
                    if (updatedProduct) {
                        quantityElem.textContent = `Stock: ${updatedProduct.quantity}`;
                    }
                }

                updateCartCount();
                renderCart();
            });
        });
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
                    parseFloat(String(a.price).replace(/[^0-9.]/g, "")) -
                    parseFloat(String(b.price).replace(/[^0-9.]/g, ""))
                );
                break;
            case "price-desc": // high to low
                sortedProducts.sort((a, b) =>
                    parseFloat(String(b.price).replace(/[^0-9.]/g, "")) -
                    parseFloat(String(a.price).replace(/[^0-9.]/g, ""))
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

//wish list
addToWisList();
