// import { auth, db } from 'main';
// import {
//     createUserWithEmailAndPassword,
//     fetchSignInMethodsForEmail
// } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
// import {
//     setDoc,
//     doc,
//     serverTimestamp
// } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

// document.addEventListener("DOMContentLoaded", () => {
//     const submitBtn = document.querySelector('.login-button');

//     if (!submitBtn) {
//         console.error("Submit button not found in DOM");
//         return;
//     }

//     submitBtn.addEventListener('click', async (e) => {
//         e.preventDefault();

//         // Inputs
//         const name = document.getElementById('name');
//         const email = document.getElementById('email');
//         const password = document.getElementById('password');
//         const role = document.getElementById('role');

//         // Error spans
//         const errorMessage = document.querySelector('.error');
//         const errorEmail = document.querySelector('.errorEmail');
//         const errorPassword = document.querySelector('.errorPassword');

//         // Helper functions
//         const showError = (field, span, msg) => {
//             field.style.border = '1px solid red';
//             span.style.display = 'block';
//             span.textContent = msg;
//         };
//         const clearError = (field, span) => {
//             field.style.border = '';
//             span.style.display = 'none';
//             span.textContent = '';
//         };
//         const clearBorders = () => [name, email, password, role].forEach(f => f.style.border = '');

//         // Empty check
//         if (!name.value || !email.value || !password.value || !role.value) {
//             errorMessage.style.display = 'block';
//             errorMessage.textContent = 'Please fill in all fields';
//             [name, email, password, role].forEach(f => f.style.border = '1px solid red');
//             return;
//         }
//         errorMessage.style.display = 'none';
//         clearBorders();

//         const emailVal = email.value.trim();
//         const passwordVal = password.value.trim();
//         const nameVal = name.value.trim();
//         const roleVal = role.value.trim();

//         const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
//         const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

//         if (!emailPattern.test(emailVal)) {
//             showError(email, errorEmail, 'Please enter a valid email address');
//             return;
//         }
//         clearError(email, errorEmail);

//         if (!passwordPattern.test(passwordVal)) {
//             showError(password, errorPassword, 'Password must be at least 8 characters long and contain at least one letter and one number');
//             return;
//         }
//         clearError(password, errorPassword);

//         submitBtn.disabled = true;

//         try {
//             // Check email existence
//             const methods = await fetchSignInMethodsForEmail(auth, emailVal);
//             if (methods.length > 0) {
//                 showError(email, errorEmail, 'Email already exists. Please use a different email.');
//                 submitBtn.disabled = false;
//                 return;
//             }

//             // Create user
//             const cred = await createUserWithEmailAndPassword(auth, emailVal, passwordVal);

//             // Save user data to Firestore
//             await setDoc(doc(db, "users", cred.user.uid), {
//                 name: nameVal,
//                 email: emailVal,
//                 role: roleVal,
//                 createdAt: serverTimestamp()
//             });

//             window.location.replace("login.html");

//         } catch (error) {
//             if (error.code === 'auth/email-already-in-use') {
//                 showError(email, errorEmail, 'Email already exists. Please use a different email.');
//             } else if (error.code === 'auth/invalid-email') {
//                 showError(email, errorEmail, 'Invalid email format.');
//             } else if (error.code === 'auth/weak-password') {
//                 showError(password, errorPassword, 'Password is too weak.');
//             } else {
//                 errorMessage.style.display = 'block';
//                 errorMessage.textContent = error.message || 'Registration failed.';
//             }
//         } finally {
//             submitBtn.disabled = false;
//         }
//     });
// });

document.addEventListener('DOMContentLoaded', () => {
    const submitBtn = document.querySelector('.login-button');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const roleInput = document.getElementById('role');
    const errorMessage = document.querySelector('.error');
    const errorName = document.querySelector('.errorName');
    const errorEmail = document.querySelector('.errorEmail');
    const errorPassword = document.querySelector('.errorPassword');

    submitBtn.addEventListener('click', function (e) {
        e.preventDefault();

        // Reset previous errors
        [nameInput, emailInput, passwordInput, roleInput].forEach(f => f.style.border = '');
        errorMessage.style.display = 'none';
        errorEmail.style.display = 'none';
        errorPassword.style.display = 'none';

        // Validate empty fields
        if (!nameInput.value || !emailInput.value || !passwordInput.value || !roleInput.value) {
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'Please fill in all fields';
            [nameInput, emailInput, passwordInput, roleInput].forEach(f => f.style.border = '1px solid red');
            return;
        }
        //validate that the name field not a number
        const nameVal = nameInput.value.trim();
        if (/\d/.test(nameVal)) {
            nameInput.style.border = '1px solid red';
            errorName.style.display = 'block';
            errorName.textContent = 'Name cannot contain a number';
            errorName.style.color='red'
            return;
        }
        const emailVal = emailInput.value.trim().toLowerCase();
        const passwordVal = passwordInput.value.trim();

        // Email & password patterns
        const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

        if (!emailPattern.test(emailVal)) {
            errorEmail.style.display = 'block';
            errorEmail.textContent = 'Please enter a valid email address';
            emailInput.style.border = '1px solid red';
            return;
        }

        if (!passwordPattern.test(passwordVal)) {
            errorPassword.style.display = 'block';
            errorPassword.textContent = 'Password must be at least 8 characters long and contain at least one letter and one number';
            passwordInput.style.border = '1px solid red';
            return;
        }

        // Check if email already exists
        let users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.some(u => u.email === emailVal)) {
            errorEmail.style.display = 'block';
            errorEmail.textContent = 'Email already exists. Please use a different email.';
            emailInput.style.border = '1px solid red';
            return;
        }

        // Save user
        if (roleInput.value.trim() === 'admin') {
            if (emailInput.value.includes('admin')) {
                users.push({
                    id: Date.now() + 1,
                    name: nameInput.value.trim(),
                    email: emailVal,
                    password: passwordVal,
                    role: roleInput.value.trim()
                });
                errorEmail.textContent = '';
                errorEmail.style.display = 'none';
            }
            else {
                errorEmail.style.display = 'block';
                errorEmail.textContent = 'You are not authorized to register as an admin.';
                emailInput.style.border = '1px solid red';
                return;
            }
        }
        else if (roleInput.value.trim() === 'user') {
            users.push({
                id: Date.now(),
                name: nameInput.value.trim(),
                email: emailVal,
                password: passwordVal,
                role: roleInput.value.trim()
            });
        }

        localStorage.setItem('users', JSON.stringify(users));
        window.location.replace('login.html');
    });
});
