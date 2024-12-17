document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registration-form");
    const submitButton = form.querySelector('button[type="submit"]');
    const passwordInput = document.getElementById("password");
    const emailInput = document.getElementById("email");
    const nameInput = document.getElementById("name");

    
    function checkPasswordStrength(password) {
        let strength = 0;
        const feedback = [];

        
        if (password.length >= 8) {
            strength += 1;
        } else {
            feedback.push("Password should be at least 8 characters long");
        }

        
        if (/[A-Z]/.test(password)) {
            strength += 1;
        } else {
            feedback.push("Add uppercase letters");
        }

        
        if (/[a-z]/.test(password)) {
            strength += 1;
        } else {
            feedback.push("Add lowercase letters");
        }

        
        if (/[0-9]/.test(password)) {
            strength += 1;
        } else {
            feedback.push("Add numbers");
        }

        
        if (/[^A-Za-z0-9]/.test(password)) {
            strength += 1;
        } else {
            feedback.push("Add special characters");
        }

        return {
            score: strength,
            feedback: feedback
        };
    }


    function updatePasswordStrength() {
        const strength = checkPasswordStrength(passwordInput.value);
        const strengthMeter = document.querySelector('.strength-meter div');
        const strengthText = document.querySelector('.password-strength');

        const colors = ['#ff4d4d', '#ffa64d', '#ffff4d', '#4dff4d'];
        const texts = ['Weak', 'Fair', 'Good', 'Strong'];

        strengthMeter.style.width = `${(strength.score / 5) * 100}%`;
        strengthMeter.style.backgroundColor = colors[strength.score - 1] || '#ddd';
        strengthText.textContent = texts[strength.score - 1] || 'Very Weak';
        strengthText.style.color = colors[strength.score - 1] || '#ff4d4d';
    }

    function validateInput(input, validationFn, errorMessage) {
        const isValid = validationFn(input.value);
        const errorElement = input.parentElement.querySelector('.error-message');
        
        if (!isValid) {
            input.classList.add('input-error');
            errorElement.style.display = 'block';
            errorElement.textContent = errorMessage;
        } else {
            input.classList.remove('input-error');
            errorElement.style.display = 'none';
        }
        
        return isValid;
    }


    const validators = {
        email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        password: (value) => value.length >= 8,
        name: (value) => value.trim().length >= 2
    };


    emailInput.addEventListener('input', () => {
        validateInput(emailInput, validators.email, 'Please enter a valid email address');
    });

    passwordInput.addEventListener('input', () => {
        validateInput(passwordInput, validators.password, 'Password must be at least 8 characters long');
        updatePasswordStrength();
    });

    nameInput.addEventListener('input', () => {
        validateInput(nameInput, validators.name, 'Name must be at least 2 characters long');
    });

    
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const isEmailValid = validateInput(emailInput, validators.email, 'Please enter a valid email address');
        const isPasswordValid = validateInput(passwordInput, validators.password, 'Password must be at least 8 characters long');
        const isNameValid = validateInput(nameInput, validators.name, 'Name must be at least 2 characters long');

        if (!isEmailValid || !isPasswordValid || !isNameValid) {
            return;
        }

        try {
            submitButton.disabled = true;
            const spinner = document.querySelector('.spinner');
            spinner.style.display = 'block';
            submitButton.textContent = 'Registering...';

            const formData = new FormData(form);
            const userData = Object.fromEntries(formData.entries());

            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            
            if (data.token) {
                localStorage.setItem('authToken', data.token);
            }

        
            alert('Registration successful!');
            window.location.href = 'confirmationPage.html';

        } catch (error) {
            alert(error.message || 'Registration failed. Please try again.');
            console.error('Registration error:', error);
        } finally {
            submitButton.disabled = false;
            document.querySelector('.spinner').style.display = 'none';
            submitButton.textContent = 'Register';
        }
    });
});