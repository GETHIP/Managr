Template.deleteSurvey.events({
  'click .deleteSurveyButton' : function(event){
    Meteor.call('removeQuestion', Template.instance().data);
  }
});
