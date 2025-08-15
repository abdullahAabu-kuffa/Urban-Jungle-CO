// import { auth } from '../main';
// import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

// document.addEventListener("DOMContentLoaded", () => {
//     const loginBtn = document.querySelector('.login-button');
//     const emailInput = document.getElementById('email');
//     const passwordInput = document.getElementById('password');
//     const errorMessage = document.querySelector('.error');

//     if (!loginBtn) {
//         console.error("Login button not found in DOM");
//         return;
//     }

//     loginBtn.addEventListener('click', async (e) => {
//         e.preventDefault();

//         const email = emailInput.value.trim();
//         const password = passwordInput.value.trim();

//         if (!email || !password) {
//             emailInput.style.border = '1px solid red';
//             passwordInput.style.border = '1px solid red';
//             errorMessage.style.display = 'block';
//             errorMessage.textContent = 'Please fill in all fields';
//             return;
//         }

//         // Reset error styles
//         emailInput.style.border = '';
//         passwordInput.style.border = '';
//         errorMessage.style.display = 'none';

//         try {
//             await signInWithEmailAndPassword(auth, email, password);
//             window.location.replace("/index.html");
//         } catch (error) {
//             emailInput.style.border = '1px solid red';
//             passwordInput.style.border = '1px solid red';
//             errorMessage.style.display = 'block';

//             if (error.code === 'auth/invalid-credential') {
//                 errorMessage.textContent = 'Invalid email or password.';
//             } else if (error.code === 'auth/invalid-email') {
//                 errorMessage.textContent = 'Invalid email format.';
//             } else {
//                 errorMessage.textContent = 'Login failed: ' + error.message;
//             }
//         }
//     });
// });


function login() {
    document.querySelector('.login-button').addEventListener('click', function (e) {
        e.preventDefault()
        let emailInput = document.getElementById('email');
        let passwordInput = document.getElementById('password');
        let errorMessage = document.querySelector('.error');
        let email = emailInput.value;
        let password = passwordInput.value;

        if (!email || !password) {
            emailInput.style.border = '1px solid red';
            passwordInput.style.border = '1px solid red';
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'Please fill in all fields';
            return;
        }
        errorMessage.style.display = 'none';

        var users = JSON.parse(localStorage.getItem('users') || '[]')
        let role = users.find(u => u.email === email && u.password === password)?.role;
        var user = users.find(u => u.email === email && u.password === password)
        
        if (user) {
            errorMessage.style.display = 'none';
            errorMessage.textContent = ''
            if (role === 'admin') {
                localStorage.setItem('currentAdmin', JSON.stringify(user));
                console.log('User ' + user.email + ' is admin');
                window.location.replace("../html/dashboard.html");

            } else if (role === 'user') {
                localStorage.setItem('currentUser', JSON.stringify(user));

                window.location.replace("../index.html");
            }
        } else {
            emailInput.style.border = '1px solid red';
            passwordInput.style.border = '1px solid red';
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'Invalid email or password.';
        }
    })
}
login()