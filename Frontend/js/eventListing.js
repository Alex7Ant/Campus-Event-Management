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
    if (!eventList) {
        console.error("Event list element (#event-list) not found in the DOM.");
        return;
    }
    eventList.innerHTML = ""; 

    events.forEach(event => {
        const li = document.createElement("li");
        li.innerHTML = `
            <h3>${event.name}</h3>
            <p>Date: ${event.date} | Time: ${event.time} | Location: ${event.location}</p>
            <p>${event.description}</p>
            <p>Seats Available: <strong>${event.seatsAvailable}</strong></p>
            <button class="rsvp-btn" data-id="${event.id}">RSVP</button>
        `;
        eventList.appendChild(li);
    });

    const rsvpButtons = document.querySelectorAll(".rsvp-btn");
    rsvpButtons.forEach(button => {
        button.addEventListener("click", () => {
            const eventId = parseInt(button.dataset.id);
            rsvpEvent(eventId);
        });
    });
}


function rsvpEvent(eventId) {
    const event = events.find(e => e.id === eventId);
    if (!event) {
        alert("Event not found.");
        return;
    }

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

    
    const name = document.getElementById("event-name").value.trim();
    const date = document.getElementById("event-date").value;
    const time = document.getElementById("event-time").value;
    const location = document.getElementById("event-location").value.trim();
    const description = document.getElementById("event-description").value.trim();
    const capacity = parseInt(document.getElementById("event-capacity").value);

    
    if (!name || !date || !time || !location || !description || isNaN(capacity) || capacity <= 0) {
        alert("Please fill out all fields correctly.");
        return;
    }

    
    const newEvent = {
        id: events.length + 1,
        name,
        date,
        time,
        location,
        description,
        capacity,
        seatsAvailable: capacity,
    };

    events.push(newEvent);
    alert("Event created successfully!");
    renderEvents();
    document.getElementById("event-form").reset(); 
});


renderEvents();
