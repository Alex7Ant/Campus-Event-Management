let isAuthenticated = false; 
document.getElementById("login-form").addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
        alert("Please enter both email and password.");
        return;
    }

    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    const isAuthenticated = email === "test@minerva.com" && password === "password123";

    if (isAuthenticated) {
        alert("Login successful!");
        window.location.href = "profile.html";
    } else {
        alert("Invalid email or password. Please try again.");
    }
});


function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


fetch('https://localhost:5500/login')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
