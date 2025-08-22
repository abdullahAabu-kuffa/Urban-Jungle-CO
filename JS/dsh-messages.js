
const menuBtn = document.getElementById("menu-btn");
const closeBtn = document.getElementById("close-btn");
const sidebar = document.getElementById("sidebar");

menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("active");
});

closeBtn.addEventListener("click", () => {
    sidebar.classList.remove("active");
});

let messages = JSON.parse(localStorage.getItem("messages")) || [];


const messagesContainer = document.querySelector(".messages");
const profileImage = localStorage.getItem("profileImage") || "../images/home/profile-image.png";
if (messagesContainer) {
    messagesContainer.innerHTML = "";

    messages.forEach((message) => {
        messagesContainer.innerHTML += `
        <div class="message-box">
          <div class="icon"><i class="fa-solid fa-comments"></i></div>
          <p>
            ${message.message}
          </p>
          <div class="client">
            <img src="${message.img}" alt="Client">
            <span>${message.name}</span>
          </div>
        </div>`;
    });
}