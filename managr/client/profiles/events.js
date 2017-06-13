Template.eventsPage.events({
<<<<<<< HEAD
  'click #calendar': function(event, template) {
    event.preventDefault();
    FlowRouter.go('/events/calendar');
  }
});

Template.eventsPage.events({
=======

  'click #calendar': function(event, template) {
    event.preventDefault();
    FlowRouter.go('/events/calendar');
},
>>>>>>> bc6fadffa45870d684c9452fd959e50257369bb6
  'click #createEventButton': function(event, template) {
    event.preventDefault();
    FlowRouter.go('/events/createEvent');
  },

  'click #editEventButton': function(event, template) {
    event.preventDefault();
    FlowRouter.go('/editEvent');
<<<<<<< HEAD
=======

>>>>>>> bc6fadffa45870d684c9452fd959e50257369bb6
  }
});
