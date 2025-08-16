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