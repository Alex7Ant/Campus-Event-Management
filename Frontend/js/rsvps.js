const router = require("../../Backend/api/login");

document.addEventListener("DOMContentLoaded", () => {
    fetchEvents();
  });
  
  async function fetchEvents() {
    try {
      const response = await fetch("/api/events");
      if (!response.ok) {
        throw new Error("Failed to load events.");
      }
      const events = await response.json();
      renderEvents(events);
    } catch (error) {
      console.error("Error fetching events:", error);
      alert("Failed to load events. Please try again later.");
    }
  }
  

  function renderEvents(events) {
    const eventList = document.getElementById("event-list");
    eventList.innerHTML = ""; 
  
    if (events.length === 0) {
      eventList.textContent = "No events available.";
      return;
    }
  
    events.forEach((event) => {
      const eventCard = document.createElement("div");
      eventCard.classList.add("event-card");
      eventCard.innerHTML = `
        <h3>${event.name}</h3>
        <p>Date: ${event.date}</p>
        <p>Time: ${event.time}</p>
        <p>Location: ${event.location}</p>
        <p>Seats Available: ${event.seats_available}</p>
        <button onclick="rsvpEvent(${event.id})" ${
        event.seats_available === 0 ? "disabled" : ""
      }>RSVP</button>
      `;
  
      eventList.appendChild(eventCard);
    });
  }
  
  async function rsvpEvent(eventId) {
    try {
      const response = await fetch(`/api/events/${eventId}/rsvp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
  
      if (response.ok) {
        alert("RSVP successful!");
        fetchEvents(); 
      } else {
        const error = await response.text();
        alert(`Error: ${error}`);
      }
    } catch (error) {
      console.error("Error RSVPing for event:", error);
      alert("Failed to RSVP. Please try again later.");
    }
  }

  module.exports = router;
  