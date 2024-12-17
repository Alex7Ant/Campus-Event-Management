document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contact-form");
  
    if (!contactForm) {
      console.error("Contact form not found in the DOM.");
      return;
    }
  
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault(); 
  
      
      alert("Your message has been sent. We'll get back to you soon!");
  
      
      const formData = new FormData(contactForm);
      console.log("Form data submitted:", Object.fromEntries(formData.entries()));
  
      
      contactForm.reset();
    });
  });
  