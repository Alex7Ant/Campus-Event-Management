const router = require("../../Backend/api/login");

let events = []; 


events.push({
    id: 1,
    name: "Workshop on AI",
    date: "2024-12-20",
    time: "10:00 AM",
    location: "Auditorium A",
    description: "Learn AI fundamentals with industry experts.",
    capacity: 50,
    seatsAvailable: 50,
});


function renderEvents() {
    const eventList = document.getElementById("event-list");
    eventList.innerHTML = ""; 

    events.forEach(event => {
        const li = document.createElement("li");
        li.innerHTML = `
            <h3>${event.name}</h3>
            <p>Date: ${event.date} | Time: ${event.time} | Location: ${event.location}</p>
            <p>${event.description}</p>
            <p>Seats Available: <strong>${event.seatsAvailable}</strong></p>
            <button onclick="rsvpEvent(${event.id})">RSVP</button>
        `;
        eventList.appendChild(li);
    });
}


function rsvpEvent(eventId) {
    const event = events.find(e => e.id === eventId);
    if (event.seatsAvailable > 0) {
        event.seatsAvailable--;
        alert(`You have successfully RSVP'd for ${event.name}.`);
        renderEvents();
    } else {
        alert("No seats available for this event.");
    }
}


document.getElementById("create-event-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const newEvent = {
        id: events.length + 1, 
        name: document.getElementById("event-name").value,
        date: document.getElementById("event-date").value,
        time: document.getElementById("event-time").value,
        location: document.getElementById("event-location").value,
        description: document.getElementById("event-description").value,
        capacity: parseInt(document.getElementById("event-capacity").value),
        seatsAvailable: parseInt(document.getElementById("event-capacity").value),
    };

    events.push(newEvent);
    alert("Event created successfully!");
    renderEvents();
    document.getElementById("create-event-form").reset();
});


renderEvents();

module.exports = router;


async function loadEvents() {
    try {
        const response = await fetch('/api/events');
        const events = await response.json();
        displayEvents(events);
    } catch (err) {
        console.error('Error loading events:', err);
    }
}

async function createRSVP(eventId) {
    try {
        const response = await fetch('/api/rsvp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            },
            body: JSON.stringify({ event_id: eventId })
        });
        
        if (!response.ok) throw new Error('RSVP failed');
        
        alert('RSVP successful!');
        loadEvents(); 
    } catch (err) {
        alert(err.message);
    }
}
