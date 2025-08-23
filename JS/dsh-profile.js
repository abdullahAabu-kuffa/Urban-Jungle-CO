const menuBtn = document.getElementById("menu-btn");
const closeBtn = document.getElementById("close-btn");
const sidebar = document.getElementById("sidebar");

menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("active");
});

closeBtn.addEventListener("click", () => {
    sidebar.classList.remove("active");
});

document.querySelector('.logout-btn').addEventListener('click', function () {
    localStorage.removeItem('currentAdmin')
    window.location.replace("../html/login.html");
})

const currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
document.addEventListener("DOMContentLoaded", () => {
    if (currentAdmin) {
        document.querySelector('.profile-name').textContent = currentAdmin.name;
        document.querySelector('.profile-email').textContent = currentAdmin.email;

        const savedImage = localStorage.getItem('profileImageAdmin');
        document.querySelector('.profile-img').src = savedImage || '../images/home/profile-image.png';
    }
});
if (currentAdmin) {
    const editBtn = document.querySelector('#upload-photo');
    editBtn.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                localStorage.setItem('profileImageAdmin', e.target.result);
                document.querySelector('.profile-img').src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
}