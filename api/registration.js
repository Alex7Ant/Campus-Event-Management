document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registration-form");
    const submitButton = form.querySelector('button[type="submit"]');

    async function registerUser(userData) {
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Registration failed');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    }

    function validateForm(userData) {
        const errors = [];

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userData.email)) {
            errors.push('Please enter a valid email address');
        }

        
        if (userData.password.length < 8) {
            errors.push('Password must be at least 8 characters long');
        }

    
        if (userData.name.trim().length < 2) {
            errors.push('Name must be at least 2 characters long');
        }

        return errors;
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        
        try {
            
            submitButton.disabled = true;
            submitButton.textContent = 'Registering...';

            
            const formData = new FormData(form);
            const userData = Object.fromEntries(formData.entries());

            
            const validationErrors = validateForm(userData);
            if (validationErrors.length > 0) {
                throw new Error(validationErrors.join('\n'));
            }

            
            const result = await registerUser(userData);

            if (result.token) {
                localStorage.setItem('authToken', result.token);
            }

            
            alert("Registration Successful!");
            
            window.location.href = "confirmationPage.html";

        } catch (error) {
            alert(error.message || 'Registration failed. Please try again.');
            console.error('Registration error:', error);
        } finally {
            
            submitButton.disabled = false;
            submitButton.textContent = 'Register';
        }
    });
});