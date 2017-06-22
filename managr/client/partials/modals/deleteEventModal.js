Template.deleteEvent.events({
  'click #confirmDeleteEvent' : function(event){
    Meteor.call('delEvent', Template.instance().data);
  }
});
