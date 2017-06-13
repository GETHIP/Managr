Template.eventsPage.events({

  'click #calendar': function(event, template) {
    event.preventDefault();
    FlowRouter.go('/events/calendar');
},
  'click #createEventButton': function(event, template) {
    event.preventDefault();
    FlowRouter.go('/events/createEvent');
  },

  'click #editEventButton': function(event, template) {
    event.preventDefault();
    FlowRouter.go('/editEvent');

  }
}); 
