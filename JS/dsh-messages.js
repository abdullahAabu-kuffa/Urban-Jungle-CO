
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


document.addEventListener("DOMContentLoaded", function () {
  const messagesContainer = document.querySelector(".messages");

  if (messages.length === 0) {
    messagesContainer.innerHTML = '';
    messagesContainer.innerHTML += `
            <div class="message-box">
            <div class="icon"><i class="fa-solid fa-comments"></i></div>
            <p>
             No Users's Messages
            </p>
            <div class="client">
              <img src="../images/home/profile-image.png" alt="Client">
              <span>Unknown</span>
            </div>
          </div>`;
  }
  else {
    messagesContainer.innerHTML = "";
    messages.forEach((message) => {
      messagesContainer.innerHTML += `
          <div class="message-box">
            <div class="icon"><i class="fa-solid fa-comments"></i></div>
            <p>
              ${message.message}
            </p>
            <div class="client">
              <img src="${message.profileImage}" alt="  ">
              <span>${message.name}</span>
            </div>
          </div>`;
    });
  }
})