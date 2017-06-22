Template.deleteEvent.events({
  'click .confirmDeleteEvent' : function(event){
    Meteor.call('removeEvent', Template.instance().data);
  }
});
