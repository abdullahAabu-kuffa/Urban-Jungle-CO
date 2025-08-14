import { auth } from './main.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

function login() {
    document.querySelector('.login-button').addEventListener('click', async function (e) {
        e.preventDefault();

        let emailInput = document.getElementById('email');
        let passwordInput = document.getElementById('password');
        let errorMessage = document.querySelector('.error');

        let email = emailInput.value.trim();
        let password = passwordInput.value.trim();

        if (!email || !password) {
            emailInput.style.border = '1px solid red';
            passwordInput.style.border = '1px solid red';
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'Please fill in all fields';
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email, password);
            // Redirect to homepage
            window.location.href = "/index.html";
        } catch (error) {
            emailInput.style.border = '1px solid red';
            passwordInput.style.border = '1px solid red';
            errorMessage.style.display = 'block';

            if (error.code === 'auth/invalid-credential') {
                errorMessage.textContent = 'Invalid email or password.';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage.textContent = 'Invalid email format.';
            } else {
                errorMessage.textContent = 'Login failed: ' + error.message;
            }
        }
    });
}

login();
