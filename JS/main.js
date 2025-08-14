// js/main.js
// This code handles the navigation bar toggle functionality for mobile view

// Function to toggle the navigation bar visibility
function menuBtnOnClick() {
    document.getElementById("nav-bar-id").style.display = "flex";
    document.querySelector(".menu-btn").style.display = "none";
    document.querySelector(".close-btn").style.display = "block";
}
// This function handles the close button click event to hide the navigation bar
function closeBtnOnClick() {
    document.getElementById("nav-bar-id").style.display = "none";
    document.querySelector(".close-btn").style.display = "none";
    document.querySelector(".menu-btn").style.display = "block";
}


// Back to Top Button Functionality
const btn = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    btn.style.display = window.scrollY > 200 ? 'flex' : 'none';
});

btn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
    });
});