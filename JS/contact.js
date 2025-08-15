
    document.addEventListener("DOMContentLoaded", function(){

        const form = document.querySelector("form");
        const nameField = document.querySelector('input[name="name"]');
        const emailField = document.querySelector('input[name="email"]');
        const phoneField = document.querySelector('input[name="phone"]');
        const messageField = document.getElementById("message");

        nameField.value = localStorage.getItem("name") || "";
        emailField.value = localStorage.getItem("email") || "";
        phoneField.value = localStorage.getItem("phone") || "";
        messageField.value = localStorage.getItem("message") || ""

        form.addEventListener("submit", function(e){
            e.preventDefault();
            localStorage.setItem("name", nameField.value);
            localStorage.setItem("email", emailField.value);
            localStorage.setItem("phone", phoneField.value);
            localStorage.setItem("message", messageField.value);

            alert("Saved in local storage");
            
        });

    });

