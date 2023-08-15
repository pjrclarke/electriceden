const API_KEY = 'AIzaSyD0ncwcGOGES-m5Xe3oN_pVHZ-RavRC8gA'; // Replace with your actual API key
const CALENDAR_ID = 'electricedenband@gmail.com'; // Replace with your Gmail address

$.ajax({
  url: `https://www.googleapis.com/calendar/v3/calendars/electricedenband@gmail.com/events?key=AIzaSyD0ncwcGOGES-m5Xe3oN_pVHZ-RavRC8gA`,
  method: 'GET',
  dataType: 'json',
  success: function(data) {
    const eventsContainer = document.getElementById('events-container');
    const currentDate = new Date();

    const sortedEvents = data.items.sort((a, b) => {
      const startDateA = new Date(a.start.dateTime);
      const startDateB = new Date(b.start.dateTime);
      return startDateA - startDateB;
    });

    sortedEvents.forEach(event => {
      const eventDateTime = new Date(event.start.dateTime);

      if (eventDateTime > currentDate) {
        const eventRow = document.createElement('div');
        eventRow.className = 'row event-row text-center';

        const eventCol = document.createElement('div');
        eventCol.className = 'col-md-12 event-col';

        const eventDate = eventDateTime.toDateString().toUpperCase();
        const eventSummary = event.summary.toUpperCase();
        const eventLocation = event.location.toUpperCase();

        eventCol.innerHTML = `
          <p>${eventDate} | ${eventSummary} | ${eventLocation} </p>
        `;

        eventRow.appendChild(eventCol);
        eventsContainer.appendChild(eventRow);
      }
    });
  },
  error: function(error) {
    console.error('Error fetching events:', error);
  }
});




