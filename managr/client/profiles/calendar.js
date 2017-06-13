Template.calendar.onRendered( () => {
  $( '#calendar' ).fullCalendar({
    header: { right: 'month,agendaWeek,agendaDay',
              center: 'title',
              left: 'today prev,next'},
  });
});
