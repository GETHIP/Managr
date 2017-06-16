Template.calendar.onRendered( () => {
  $( '#calendar' ).fullCalendar({
    header: { right: 'month,agendaWeek,agendaDay',
              center: 'title',
              left: 'today prev,next'},
    businessHours: {
              // days of week. an array of zero-based day of week integers (0=Sunday)
              dow: [ 1, 2, 3, 4, 5, 6 ], // Monday - Saturday

              start: '8:00', // a start time (10am in this example)
              end: '18:00', // an end time (6pm in this example)
          },
          eventLimit: true, // for all non-agenda views
  views: {
      agenda: {
          eventLimit: 6 // adjust to 6 only for agendaWeek/agendaDay
      }
  },
  });
});
