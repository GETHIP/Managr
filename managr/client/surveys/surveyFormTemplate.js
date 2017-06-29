import { Surveys } from '../../collections/surveys.js';
import { Student } from '../../collections/student.js';
import { Groups } from '../../collections/groups.js';
import { Questions } from '../../collections/questions.js';

Template.newSurvey.onCreated(function() {
    Meteor.subscribe("Student");
    Meteor.subscribe("Surveys");
    Meteor.subscribe("Questions");
});
Template.newSurvey.onRendered(function (){
  Template.newSurvey.events({
    'click #addQuestionBtn' (event) {
      event.preventDefault();

      const form = event.target;

      const surveyName = document.getElementById('surveyName').value;
      console.log(document.getElementById('dueDate').value);
      //converst dat to string and slices date
      const date = moment(document.getElementById('dueDate').value).format("MM/DD/YYYY").toString().slice(0,14);
      // var question = document.getElementById('questionFormm').value;
      const anonToggle = document.getElementById('anonymousToggle').checked;
  //    var question = target.prompt.value;
      console.log(surveyName);
      console.log(date);
      console.log(anonToggle);

      Meteor.call("createNewSurvey", surveyName, date, anonToggle, function(error, result) {
  			  FlowRouter.go("/addQuestion/" + result);
  		});
    }
  });
});
// Template.questionFormTemplate.helpers({
//   questionData: function() {
//       var questionArray = Questions.find({}).fetch();
//   }
//
// });
