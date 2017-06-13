Template.eventsPage.events({
<<<<<<< HEAD
  'click #calendar': function(event, template) {
    event.preventDefault();
    FlowRouter.go('/events/calendar');
=======
  'click #createEventButton': function(event, template) {
    event.preventDefault();
    FlowRouter.go('/events/createEvent');
  }
});

Template.eventsPage.events({
  'click #editEventButton': function(event, template) {
    event.preventDefault();
    FlowRouter.go('/editEvent');
>>>>>>> b534821231e537b43c086b987cc6e2fc2862078b
  }
});
