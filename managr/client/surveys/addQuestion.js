import { Surveys } from '../../collections/surveys.js';
import { Student } from '../../collections/student.js';
import { Groups } from '../../collections/groups.js';
import { Questions } from '../../collections/questions.js';

Template.completedQuestion.onCreated(function() {
  Meteor.subscribe("Student");
  Meteor.subscribe("Surveys");
  Meteor.subscribe("Questions");
});

Template.addQuestion.events({
  'click #createSurveyBtn' (event) {
    event.preventDefault();

    var questionArray = Surveys.find({}).fetch();
    // var surveyId = 
    Meteor.call("updateSurvey", surveyId, questionArray);
    FlowRouter.go('/surveys');
  }
});
