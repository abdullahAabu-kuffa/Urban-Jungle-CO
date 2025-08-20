let user = JSON.parse(localStorage.getItem('currentUser'));

window.addEventListener('DOMContentLoaded', () => {
    if (user) {
        document.querySelector('.profile-name').textContent = user.name;
        document.querySelector('.profile-email').textContent = user.email;
        document.querySelector('.profile-role').textContent = user.role;
    } else {
        document.querySelector('.profile-name').textContent = 'Guest';
        document.querySelector('.profile-email').textContent = 'Not logged in';
        document.querySelector('.profile-role').textContent = 'Guest';
    }

    const savedImage = localStorage.getItem('profileImage');
    document.querySelector('.profile-image img').src = savedImage || '../images/home/profile-image.png';
});

// Save image
document.getElementById('selected-image').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            localStorage.setItem('profileImage', e.target.result);
            document.querySelector('.profile-image img').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Logout
document.querySelector('.logout-btn').addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
});

// Previous Orders
window.addEventListener('DOMContentLoaded', () => {

    let previousOrder = JSON.parse(localStorage.getItem('previousOrders')) || [];
    // localStorage.removeItem('previousOrders');
    if (previousOrder.length === 0) {
        var tr = document.createElement('tr')
        tr.innerHTML = '<td colspan="4">No Items Found</td>'
        document.querySelector('.orders-items').appendChild(tr)
    }
    else {
        // document.querySelector('.previous-orders').style.display = "block";
        var tbody = document.querySelector('.orders-items')
        previousOrder.forEach(item => {
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
    if (wishList.length === 0) {
        var tr = document.createElement('tr')
        tr.innerHTML = '<td colspan="4">No Items Found</td>'
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
                <td>${item.price}</td>
                <td>${item.quantity.replace(/[^0-9.]/g, '')}</td>
                <td class="orders-actions"><i class="fa-regular fa-star wishlist-click"></i></td>

            `;
            tbody.appendChild(itemEl);
        });
        const wishListClick = document.querySelectorAll(".wishlist-click");
        wishListClick.forEach((whish) => {
            whish.style.color = '#f8f403ff'
            
        })
    }
    
    document.querySelectorAll('.orders-actions').forEach(actionCell => {
        actionCell.addEventListener('click', (e) => {
            const row = e.target.closest("tr");
            const name = row.querySelector(".name").textContent;
            wishList = wishList.filter(item => item.name !== name);
            localStorage.setItem('wishList', JSON.stringify(wishList));
            row.remove(); 
            if(wishList.length === 0){
                var tr = document.createElement('tr')
                tr.innerHTML = '<td colspan="4">No Items Found</td>'
                document.querySelector('.wish-items').appendChild(tr)
            }
        });
    });
})