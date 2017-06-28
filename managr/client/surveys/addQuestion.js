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

    var surveyId = FlowRouter.getParam('id');
    var questionArray = Surveys.findOne({surveyId}).fetch();

    Meteor.call("updateSurvey", surveyId, questionArray);
    var surveyComplete = questionArray;
    FlowRouter.go('/surveys');

    // const target = event.target;
    // FlowRouter.go("/addQuestion/" + target.id);
  }
});
