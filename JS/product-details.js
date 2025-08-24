
document.addEventListener("DOMContentLoaded", () => {

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

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



    function updateCartCount() {
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


    function updateTotalPrice() {
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


    function renderCart() {
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
});
