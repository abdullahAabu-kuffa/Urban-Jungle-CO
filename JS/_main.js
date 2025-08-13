function menuBtnOnClick() {
    document.getElementById("nav-bar-id").style.display = "flex";
    document.querySelector(".menu-btn").style.display = "none";
    document.querySelector(".close-btn").style.display = "block";
}

function closeBtnOnClick() {
    document.getElementById("nav-bar-id").style.display = "none";
    document.querySelector(".close-btn").style.display = "none";
    document.querySelector(".menu-btn").style.display = "block";
}