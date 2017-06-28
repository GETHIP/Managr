import { Surveys } from '../../collections/surveys.js';
import { Student } from '../../collections/student.js';

Template.surveysResults.onCreated(function() {
  Meteor.subscribe("Surveys", function() {
    var survey = Assignments.findOne({_id: FlowRouter.getParam("id")});
    // if(survey == undefined) {
    //     FlowRouter.go("/surveys");
    // }
  });
  Meteor.subscribe("Student");
});

Template.surveysResults.events({
  'click #deleteSurvey': function(event){
    Modal.show('deleteSurveyModal');
  }
})
