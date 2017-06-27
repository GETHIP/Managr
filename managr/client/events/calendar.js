import {
  Events
} from '../../collections/event.js';


Template.calendar.onRendered( () => {
  $('#calendar').fullCalendar({
    events: events(),
    eventColor: '#BD53FF', // changes the color of event placeholder
    editable: true, // allows an event to be edited
    eventDurationEditable: true, // allows the time/date be changed
  
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

var events = function() {
  var calendarEvents = [];
  var events = Events.find({}, {
      sort: {
          date: 1
      }
  }).fetch();
  for (event of events) {
      calendarEvents.push({
          title: event.name,
          start: event.date,
          url: "/eventView/" + event._id
      });
  }
  return calendarEvents;
}
