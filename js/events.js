const sampleEvents = [
    { name: 'Tech Workshop', date: '2024-12-20', location: 'Hall A' },
    { name: 'Business Seminar', date: '2024-12-25', location: 'Conference Room' },
    { name: 'Art Exhibition', date: '2024-12-30', location: 'Gallery' }
];

const eventsContainer = document.getElementById('events-container');
sampleEvents.forEach(event => {
    const eventCard = document.createElement('div');
    eventCard.classList.add('event-card');

    eventCard.innerHTML = `
        <h3>${event.name}</h3>
        <p>Date: ${event.date}</p>
        <p>Location: ${event.location}</p>
        <button>Register</button>
    `;

    eventsContainer.appendChild(eventCard);
});


const eventForm = document.getElementById('event-form');
eventForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const eventName = document.getElementById('event-name').value;
    const eventDate = document.getElementById('event-date').value;
    const eventLocation = document.getElementById('event-location').value;

    if (eventName && eventDate && eventLocation) {
        alert(`Event "${eventName}" registered successfully!`);
        eventForm.reset();
    } else {
        alert('Please fill out all fields.');
    }
});


function loadEvents() {
    fetch('/api/events')
      .then(response => response.json())
      .then(events => {
        const eventList = document.getElementById('event-list');
        eventList.innerHTML = ''; 
        
        events.forEach(event => {
          const li = document.createElement('li');
          li.textContent = `${event.event_name} - ${event.start_date}`;
          eventList.appendChild(li);
        });
      })
      .catch(error => {
        console.error('Error loading events:', error);
      });
  }
  
