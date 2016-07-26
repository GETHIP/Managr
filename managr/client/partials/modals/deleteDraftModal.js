
Template.deleteDraft.events({
  'click .deleteDraftButton' : function(event){
    Meteor.call('delDraft', Template.instance().data);
  }
})
