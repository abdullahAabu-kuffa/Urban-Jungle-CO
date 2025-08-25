

let currentUser = JSON.parse(localStorage.getItem('currentUser'));
let previousOrders = JSON.parse(localStorage.getItem('previousOrders')) || [];


window.addEventListener('DOMContentLoaded', () => {
    if (currentUser) {
        document.querySelector('.profile-name').textContent = currentUser.name;
        document.querySelector('.profile-email').textContent = currentUser.email;
        document.querySelector('.profile-role').textContent = currentUser.role;
    } else {
        document.querySelector('.profile-name').textContent = 'Guest';
        document.querySelector('.profile-email').textContent = 'Not logged in';
        document.querySelector('.profile-role').textContent = 'Guest';
    }

    const savedImages = JSON.parse(localStorage.getItem('profileImage')) || [];
    const imagesArray = Array.isArray(savedImages) ? savedImages : [];
    const savedImage = imagesArray.find(img => img.id === currentUser.id)?.src;
    document.querySelector('.profile-image img').src = savedImage || '../images/home/profile-image.png';

});

// Save image
document.getElementById('selected-image').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            let images = JSON.parse(localStorage.getItem('profileImage')) || [];
            if (!Array.isArray(images)) {
                images = []; // reset if it's not an array
            }
            images = images.filter(img => img.id !== currentUser.id);
            const imagedata = { id: currentUser.id, src: e.target.result };
            images.push(imagedata);
            localStorage.setItem('profileImage', JSON.stringify(images));

            document.querySelector('.profile-image img').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});


// Logout
document.querySelector('.logout-btn').addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    window.location.replace('../index.html');
});


// Previous Orders
window.addEventListener('DOMContentLoaded', () => {

    // localStorage.removeItem('previousOrderss');
    if (previousOrders.length === 0) {
        var tr = document.createElement('tr')
        tr.innerHTML = '<td colspan="4">No Items Found</td>'
        document.querySelector('.orders-items').appendChild(tr)
    }
    else {
        var tbody = document.querySelector('.orders-items')
        previousOrders.forEach(item => {
            const itemEl = document.createElement("tr");
            itemEl.innerHTML = `
               <td class="orders-product-cell" style ="margin-left:30px">
                   <img src=${item.imageSrc} alt="Golden Glow">
                   <span class="name" style ="margin-left:30px">${item.name}</span>
                </td>
                <td>${item.price}</td>
                <td>${item.quantity}</td>
                <td>$${parseFloat(item.price.replace(item.price[0], '')) * parseInt(item.quantity)}</td>
                
            `;
            tbody.appendChild(itemEl);
        });
    }


});


//wishlist
window.addEventListener('DOMContentLoaded', () => {

    let wishList = JSON.parse(localStorage.getItem('wishList')) || [];
    let products = JSON.parse(localStorage.getItem('products')) || [];
    let cart = JSON.parse(localStorage.getItem('cart')) || [];


    if (wishList.length === 0) {
        var tr = document.createElement('tr')
        tr.innerHTML = '<td colspan="5">No Items Found</td>'
        document.querySelector('.wish-items').appendChild(tr)
    }
    else {
        var tbody = document.querySelector('.wish-items')
        wishList.forEach(item => {
            const itemEl = document.createElement("tr");
            itemEl.innerHTML = `
               <td class="orders-product-cell" style ="margin-left:30px">
                   <img src=${item.imageSrc} alt="Golden Glow">
                   <span class="name" style ="margin-left:30px">${item.name}</span>
                </td>
                <td class = "price">${item.price}</td>
                <td class = "quantity">${item.quantity.replace(/[^0-9.]/g, '')}</td>
                <td class = "delete-from-wishlist"><i class="fa-regular fa-star wishlist-click"></i></td>
                <td> <i class="fa-solid fa-cart-plus add-to-cart-icon"></i></td>
            `;
            tbody.appendChild(itemEl);
        });
        const wishListClick = document.querySelectorAll(".wishlist-click");
        wishListClick.forEach((whish) => {
            whish.style.color = '#f8f403ff'
            whish.style.cursor='pointer'
        })
    }

    //delete form wishlist
    document.querySelectorAll('.delete-from-wishlist').forEach(actionCell => {
        actionCell.addEventListener('click', (e) => {
            const row = e.target.closest("tr");
            const name = row.querySelector(".name").textContent;
            wishList = wishList.filter(item => item.name !== name);
            localStorage.setItem('wishList', JSON.stringify(wishList));
            row.remove();
            if (wishList.length === 0) {
                var tr = document.createElement('tr')
                tr.innerHTML = '<td colspan="5">No Items Found</td>'
                document.querySelector('.wish-items').appendChild(tr)
            }
        });
    });
    function showAlert(message, bgColor) {
        const alertBox = document.getElementById("custom-alert");
        const alertMessage = document.getElementById("alert-message");
        alertBox.style.backgroundColor = bgColor;
        alertMessage.textContent = message;
        alertBox.classList.remove("hidden");
    }

    function closeAlert() {
        document.getElementById("custom-alert").classList.add("hidden");
    }
    function updateCartCount() {
        // Always get latest cart and user from localStorage
        const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

        let countPending = 0;
        let conntAccepted = 0;
        if (currentUser) {
            countPending = cart
                .filter(item => item.currentUser && item.currentUser.email === currentUser.email)
                .reduce((acc, item) => acc + Number(item.quantity), 0);
            conntAccepted = previousOrders
                //.filter(item => item.currentUser && item.currentUser.email === currentUser.email)
                .reduce((acc, item) => acc + Number(item.quantity), 0);
        }
        const cartCountEl = document.querySelector(".count-orders");
        if (cartCountEl) {
            cartCountEl.textContent = (countPending + conntAccepted);
        }
    }

    //add to cart form wishlist
    document.querySelectorAll(".add-to-cart-icon").forEach((btn) => {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation(); // stop product-details navigation

            const product = e.target.closest("tr");
            const name = product.querySelector(".name").textContent;
            const price = product.querySelector(".price").textContent;
            const imageSrc = product.querySelector("img").src;

            // default quantity = 1 when added to cart
            const quantity = 1;
            let category;
            // check logged in user

            let isQuentaty = false;
            let proQuantity;
            products.forEach((product) => {
                if (product.name == name) {
                    proQuantity = product.quantity;
                    if (product.quantity >= 1) {
                        product.quantity -= 1;
                        isQuentaty = true;
                        category = product.category;
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

            localStorage.setItem("cart", JSON.stringify(cart));
            localStorage.setItem("products", JSON.stringify(products));
            updateCartCount();
            // Update the stock number visually

        });

    });
})