// this code handles the firebase functionality
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCbneIlj9PY9pn2goEQYH_q34squP4kImE",
    authDomain: "urban-jungle-318b7.firebaseapp.com",
    projectId: "urban-jungle-318b7",
    storageBucket: "urban-jungle-318b7.firebasestorage.app",
    messagingSenderId: "103194548210",
    appId: "1:103194548210:web:28bb7cd72aa92a5a95fd6b",
    measurementId: "G-76S7RCYBK8"
};

const app = initializeApp(firebaseConfig);

// Auth & DB instances (export for use everywhere)
export const auth = getAuth(app);
export const db = getFirestore(app);
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

window.menuBtnOnClick = menuBtnOnClick;
window.closeBtnOnClick = closeBtnOnClick;
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
const selectFilter = document.getElementById("filter-products");
selectFilter.addEventListener("click", function () {
    isBordered = !isBordered;
    selectFilter.style.border = isBordered ? "1px dashed var(--main-font-color)" : "none";
});