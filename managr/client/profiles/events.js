Template.eventsPage.events({
  'click #calendar': function(event, template) {
    event.preventDefault();
    FlowRouter.go('/events/calendar');
  }
});
