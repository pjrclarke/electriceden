$.ajax({
  url: `https://www.googleapis.com/calendar/v3/calendars/electricedenband@gmail.com/events?key=AIzaSyD0ncwcGOGES-m5Xe3oN_pVHZ-RavRC8gA`,
  method: 'GET',
  dataType: 'json',
  success: function(data) {
    const eventsContainer = document.getElementById('events-container');
    const currentDate = new Date();
    let hasUpcomingEvents = false;

    if (data.items && data.items.length) {
      const sortedEvents = data.items
        .filter(item => item.start?.dateTime)
        .sort((a, b) => new Date(a.start.dateTime) - new Date(b.start.dateTime));

      sortedEvents.forEach(event => {
        const eventDateTime = new Date(event.start.dateTime);
        if (eventDateTime > currentDate) {
          hasUpcomingEvents = true;

          const eventRow = document.createElement('div');
          eventRow.className = 'row event-row';

          const eventCol = document.createElement('div');
          eventCol.className = 'col-md-12 event-col';

          const eventDate = eventDateTime.toDateString().toUpperCase();
          const eventSummary = event.summary?.toUpperCase() || 'NO TITLE';
          const eventLocation = event.location?.toUpperCase() || 'LOCATION UNKNOWN';

          eventCol.innerHTML = `
            <p>${eventDate} <br> ${eventSummary} <br> ${eventLocation}</p>
            <hr>
          `;

          eventRow.appendChild(eventCol);
          eventsContainer.appendChild(eventRow);
        }
      });
    }

    if (!hasUpcomingEvents) {
      eventsContainer.innerHTML = `
        <div class="no-events">
          <p>No upcoming events at the moment.</p>
          <a href="/contact.html" class="btn contact-button">Contact Us</a>
        </div>
      `;
    }
  },
  error: function(error) {
    console.error('Error fetching events:', error);
    document.getElementById('events-container').innerHTML = `
      <div class="error-message">
        <p>No upcoming events at the moment.</p>
        <a href="/contact.html" class="btn contact-button">Contact Us</a>
      </div>
    `;
  }
});
