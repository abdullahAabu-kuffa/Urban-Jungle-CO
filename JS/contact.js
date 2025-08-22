// const menuBtn = document.getElementById("menu-btn");
// const closeBtn = document.getElementById("close-btn");
// const sidebar = document.getElementById("sidebar");

// menuBtn.addEventListener("click", () => {
//     sidebar.classList.toggle("active");
// });

// closeBtn.addEventListener("click", () => {
//     sidebar.classList.remove("active");
// });


let messages = JSON.parse(localStorage.getItem("messages")) || [];

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const nameField = document.querySelector('input[name="name"]');
    const emailField = document.querySelector('input[name="email"]');
    const phoneField = document.querySelector('input[name="phone"]');
    const messageField = document.getElementById("message");
    if (!form) return;
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // no field empty
        if (
            nameField.value === "" ||
            emailField.value === "" ||
            phoneField.value === "" ||
            messageField.value === ""
        ) {
            alert("Please fill all fields !");
            return;
        }

        // name validate
        const nameRegax = /^[A-Za-z\s]+$/;
        if (!nameRegax.test(nameField.value)) {
            alert("Name must be letters only!");
            return;
        }

        // email validate
        const emailRegax = /^[A-Za-z._%+-]+@[A-Za-z.-]+\.(com)$/;
        if (!emailRegax.test(emailField.value)) {
            alert("Not correct email !");
            return;
        }

        // phone validate
        const phoneRegax = /^[0-9]+$/;
        if (!phoneRegax.test(phoneField.value)) {
            alert("Phone must be numbers !");
            return;
        }

        // not empty message
        if (messageField.value.trim() === "") {
            alert("Message is empty !");
            return;
        }

        // if everything is correct store data "../images/home/profile-image.png"
        let profileImage = JSON.parse(localStorage.getItem("profileImage")) || []
        let currentUser=JSON.parse(localStorage.getItem("currentUser"))
        const img=profileImage.find(img => img.id === currentUser.id)?.src || "../images/home/profile-image.png"
        let newMessage = {
            name: nameField.value,
            email: emailField.value,
            phone: phoneField.value,
            message: messageField.value,
            profileImage: img
        };

        messages.push(newMessage);
        localStorage.setItem("messages", JSON.stringify(messages));
        alert("Data is saved !");
        form.reset();


    });
});



