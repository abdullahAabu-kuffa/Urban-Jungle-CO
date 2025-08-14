// register.js
import { auth, db } from './main.js';
import {
    createUserWithEmailAndPassword,
    fetchSignInMethodsForEmail
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import {
    setDoc,
    doc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

function registeration() {
    const submitBtn = document.querySelector('.login-button');

    submitBtn.addEventListener('click', async (e) => {
        e.preventDefault();

        // Inputs
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        const role = document.getElementById('role');

        // Error spans
        const errorMessage = document.querySelector('.error');
        const errorEmail = document.querySelector('.errorEmail');
        const errorPassword = document.querySelector('.errorPassword');

        // Helper functions
        const showError = (field, span, msg) => {
            field.style.border = '1px solid red';
            span.style.display = 'block';
            span.textContent = msg;
        };
        const clearError = (field, span) => {
            field.style.border = '';
            span.style.display = 'none';
            span.textContent = '';
        };
        const clearBorders = () => [name, email, password, role].forEach(f => f.style.border = '');

        // Empty check
        if (!name.value || !email.value || !password.value || !role.value) {
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'Please fill in all fields';
            [name, email, password, role].forEach(f => f.style.border = '1px solid red');
            return;
        }
        errorMessage.style.display = 'none';
        clearBorders();

        const emailVal = email.value.trim();
        const passwordVal = password.value.trim();
        const nameVal = name.value.trim();
        const roleVal = role.value.trim();

        const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

        if (!emailPattern.test(emailVal)) {
            showError(email, errorEmail, 'Please enter a valid email address');
            return;
        }
        clearError(email, errorEmail);

        if (!passwordPattern.test(passwordVal)) {
            showError(password, errorPassword, 'Password must be at least 8 characters long and contain at least one letter and one number');
            return;
        }
        clearError(password, errorPassword);

        submitBtn.disabled = true;

        try {
            // Check email existence
            const methods = await fetchSignInMethodsForEmail(auth, emailVal);
            if (methods.length > 0) {
                showError(email, errorEmail, 'Email already exists. Please use a different email.');
                submitBtn.disabled = false;
                return;
            }

            // Create user
            const cred = await createUserWithEmailAndPassword(auth, emailVal, passwordVal);

            // Save user data to Firestore
            await setDoc(doc(db, "users", cred.user.uid), {
                name: nameVal,
                email: emailVal,
                role: roleVal,
                createdAt: serverTimestamp()
            });

            console.log("✅ User registered and saved. Redirecting...");
            window.location.href = "login.html"; // change path if needed

        } catch (error) {
            console.error("❌ Registration error:", error);

            if (error.code === 'auth/email-already-in-use') {
                showError(email, errorEmail, 'Email already exists. Please use a different email.');
            } else if (error.code === 'auth/invalid-email') {
                showError(email, errorEmail, 'Invalid email format.');
            } else if (error.code === 'auth/weak-password') {
                showError(password, errorPassword, 'Password is too weak.');
            } else {
                errorMessage.style.display = 'block';
                errorMessage.textContent = error.message || 'Registration failed.';
            }
        } finally {
            submitBtn.disabled = false;
        }
    });
}

registeration();
