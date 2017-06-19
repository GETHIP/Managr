Template.calendar.onRendered( () => {
  $( '#calendar' ).fullCalendar({
    header: { right: 'month,agendaWeek,agendaDay',
              center: 'title',
              left: 'today prev,next'},

          eventLimit: true, // for all non-agenda views
  views: {
      agenda: {
          eventLimit: 8 // adjust to 6 only for agendaWeek/agendaDay
      }
  },
  navLinks: true, //can click day/week names to navigate views
  selectable: true, //ability to select days and time slots
  selectHelper: true,  //placeholder when you select the time slots
  allDaySlot: true
  });
});
