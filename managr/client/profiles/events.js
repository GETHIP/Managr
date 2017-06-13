Template.eventsPage.events({
  'click #createEventButton': function(event, template) {
    event.preventDefault();
    FlowRouter.go('/events/createEvent');
  }
});

Template.eventsPage.events({
  'click #editEventButton': function(event, template) {
    event.preventDefault();
    FlowRouter.go('/editEvent');
  }
});
