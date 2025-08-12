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
        var user = users.find(u => u.email === email && u.password === password)
        if (user) {
            errorMessage.style.display = 'none';
            errorMessage.textContent = ''
            window.location.href = "index.html";
        } else {
            emailInput.style.border = '1px solid red';
            passwordInput.style.border = '1px solid red';
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'There are no accounts with this email';
        }
    })
}
login()