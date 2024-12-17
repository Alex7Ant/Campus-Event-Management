const events = [
    { date: "2024-12-05", type: "workshop", title: "Tech Workshop" },
    { date: "2024-12-12", type: "seminar", title: "AI in Education Seminar" },
    { date: "2024-12-14", type: "club", title: "Music Club Performance" },
    { date: "2024-12-20", type: "seminar", title: "Business Strategy Seminar" },
    { date: "2024-12-22", type: "workshop", title: "Web Development Bootcamp" },
    { date: "2024-12-25", type: "club", title: "Drama Club Play" },
  ];
  
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  
  let currentMonth = new Date().getMonth();
  let currentYear = new Date().getFullYear();
  
  const calendarTitle = document.getElementById("calendar-title");
  const calendarGrid = document.getElementById("calendar-grid");
  const eventTypeFilter = document.getElementById("event-type");
  
  function loadCalendar(month, year) {
    const firstDay = new Date(year, month).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
  
    const selectedType = eventTypeFilter.value;
    const filteredEvents = events.filter((event) => {
      return (
        event.date.startsWith(`${year}-${String(month + 1).padStart(2, "0")}`) &&
        (selectedType === "all" || event.type === selectedType)
      );
    });
  
    calendarTitle.textContent = `${monthNames[month]} ${year}`;
    calendarGrid.innerHTML = "";
  
    for (let i = 0; i < firstDay; i++) {
      const emptyCell = document.createElement("div");
      emptyCell.classList.add("calendar-day", "empty");
      calendarGrid.appendChild(emptyCell);
    }
  
    for (let i = 1; i <= daysInMonth; i++) {
      const dayCell = document.createElement("div");
      dayCell.classList.add("calendar-day");
      dayCell.innerHTML = `<span>${i}</span>`;
  
      const dayEvents = filteredEvents.filter(
        (event) =>
          event.date === `${year}-${String(month + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`
      );
      dayEvents.forEach((event) => {
        const eventDiv = document.createElement("div");
        eventDiv.classList.add("event");
        eventDiv.textContent = event.title;
        dayCell.appendChild(eventDiv);
      });
  
      calendarGrid.appendChild(dayCell);
    }
  }
  
  document.getElementById("prev-month").addEventListener("click", () => {
    currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    currentYear = currentMonth === 11 ? currentYear - 1 : currentYear;
    loadCalendar(currentMonth, currentYear);
  });
  
  document.getElementById("next-month").addEventListener("click", () => {
    currentMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    currentYear = currentMonth === 0 ? currentYear + 1 : currentYear;
    loadCalendar(currentMonth, currentYear);
  });
  
  eventTypeFilter.addEventListener("change", () => {
    loadCalendar(currentMonth, currentYear);
  });
  
  loadCalendar(currentMonth, currentYear);
  