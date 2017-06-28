Template.deleteSurveyModal.events({
  "click #confirmDeleteSurvey"(event) {
    event.preventDefault();
    var surveyId = FlowRouter.getParam('id');
    Meteor.call('removeSurvey', surveyId);
    FlowRouter.go("/surveys");
  }
});
