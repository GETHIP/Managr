import { Surveys } from '../../../collections/surveys.js';

Template.deleteQuestion.onCreated(function() {
  Meteor.subscribe("Student");
  Meteor.subscribe("Surveys");
});

Template.deleteQuestion.events({
  'click .deleteQuestionButton' : function(event){
    event.preventDefault();
    var surveyId = Template.instance().data.surveyId;
    var dateHash = Template.instance().data.dateHash;
    dateHash = parseInt(dateHash);
    console.log(surveyId);
    console.log(dateHash);
    
    Meteor.call('removeQuestion', surveyId, dateHash);
  }
});
