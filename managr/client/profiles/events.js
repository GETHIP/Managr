Template.eventsPage.events({
  'click #createEventButton': function(event, template) {
    event.preventDefault();
    FlowRouter.go('/events/createEvent');
  }
});
