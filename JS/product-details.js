
import { updateCartCount, updateTotalPrice, renderCart, showAlert, closeAlert, } from "./main.js";
import { currentUser, cart, products } from "./main.js";

document.addEventListener("DOMContentLoaded", () => {

    //fetch the product
    const product = JSON.parse(localStorage.getItem("clickedProduct"));
    if (!product) return;

    const productContainer = document.querySelector(".product-container");
    productContainer.querySelector(".name").textContent = product.name;
    productContainer.querySelector(".price").textContent = product.price;
    productContainer.querySelector(".description").textContent = product.description;
    productContainer.querySelector(".pro-img").src = product.image;
    const categories = productContainer.querySelectorAll(".category");
    categories.forEach((el) => {
        el.textContent = product.category;
    });

    //add to cart
    const btn = productContainer.querySelector(".add-to-cart-button");
    btn.addEventListener("click", function () {

        const productName = productContainer.querySelector(".name").textContent;
        const productPrice = productContainer.querySelector(".price").textContent;
        const productCategory = productContainer.querySelector(".category").textContent;
        const productImg = productContainer.querySelector(".pro-img").src;
        const quantityInput = productContainer.querySelector("input[type='number']");
        const quantity = quantityInput ? Number(quantityInput.value) || 1 : 1;


        if (!currentUser) {
            window.location.replace("login.html");
            return;
        }

        let isQuentaty = false;
        let proQuantity;
        products.forEach((product) => {

            if (product.name == productName) {
                proQuantity = product.quantity;

                if (product.quantity >= quantity) {
                    product.quantity -= quantity;
                    isQuentaty = true;
                }
                localStorage.setItem("products", JSON.stringify(products));
            }
        })

        if (!isQuentaty) {
            showAlert(`The Stock is ${proQuantity} Product`, ' #b11111ff')
            setTimeout(() => closeAlert(), 2000);
            return;
        } else {
            showAlert(`Done!`, '#779c26')
            setTimeout(() => closeAlert(), 2000);
        }

        const productData = {
            name: productName,
            price: productPrice,
            category: productCategory,
            imageSrc: productImg,
            quantity: quantity,
            currentUser: currentUser
        };

        const existingProduct = cart.find(item => item.name === productName);
        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.push(productData);
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        localStorage.setItem("products", JSON.stringify(products));

        updateTotalPrice()
        updateCartCount();
        renderCart();
    });
});


document.addEventListener("DOMContentLoaded", function () {
    updateTotalPrice()
    updateCartCount();
    renderCart();
})
