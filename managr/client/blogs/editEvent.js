Template.eventsPage.events({
  'click #editEventButton': function(event, template) {
    event.preventDefault();
    FlowRouter.go('/editEvent');
  }
});
