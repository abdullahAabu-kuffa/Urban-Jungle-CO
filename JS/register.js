function registeration() {
    document.querySelector('.login-button').addEventListener('click', function (e) {
        e.preventDefault();
        var name = document.getElementById('name')
        var email = document.getElementById('email')
        var password = document.getElementById('password')
        var role = document.getElementById('role')
        let errorMessage = document.querySelector('.error');

        // validate form data name, email, password and role empty or not
        if (!name.value || !email.value || !password.value || !role.value) {
            name.style.border = '1px solid red';
            email.style.border = '1px solid red';
            password.style.border = '1px solid red';
            role.style.border = '1px solid red';
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'Please fill in all fields';
            return;
        }
        errorMessage.style.display = 'none';
        name.style.border = '';
        email.style.border = '';
        password.style.border = '';
        role.style.border = '';

        // validate form data email and password with regex
        var emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
        var passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
        if (!emailPattern.test(email.value.trim())) {
            document.querySelector('.errorEmail').style.display = 'block';
            email.style.border = '1px solid red';
            document.querySelector('.errorEmail').textContent = 'Please enter a valid email address';
            return
        }
        email.style.border = '';

        document.querySelector('.errorEmail').style.display = 'none';
        if (!passwordPattern.test(password.value.trim())) {
            document.querySelector('.errorPassword').style.display = 'block';
            password.style.border = '1px solid red';

            document.querySelector('.errorPassword').textContent = 'Password must be at least 8 characters long and contain at least one letter and one number';
            return
        }
        password.style.border = '';

        document.querySelector('.errorPassword').style.display = 'none';

        // validate if the email already exists
        var users = JSON.parse(localStorage.getItem('users') || '[]')
        var user = users.find(u => u.email === email.value)
        if (user) {
            email.style.border = '1px solid red';
            document.querySelector('.errorEmail').style.display = 'block';
            document.querySelector('.errorEmail').textContent = 'Email already exists. Please use a different email.';
            return
        }
        email.style.border = '';

        document.querySelector('.errorEmail').style.display = 'none';

        // save user data
        var users = JSON.parse(localStorage.getItem('users') || '[]')
        users.push({ name: name.value.trim(), email: email.value.trim(), password: password.value.trim(), role: role.value.trim() })
        localStorage.setItem('users', JSON.stringify(users))
        window.location.replace('login.html')
    })
}
registeration()