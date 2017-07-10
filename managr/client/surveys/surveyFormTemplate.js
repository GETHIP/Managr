import { Surveys } from '../../collections/surveys.js';
import { Student } from '../../collections/student.js';
import { Groups } from '../../collections/groups.js';
import { Questions } from '../../collections/questions.js';

Template.newSurvey.onCreated(function() {
  Meteor.subscribe("Student");
  Meteor.subscribe("Surveys");
  Meteor.subscribe("Questions");
  Meteor.subscribe("Groups");
});
Template.newSurvey.events({
  'click #addQuestionBtn' (event) {
    event.preventDefault();
    const form = event.target;

    const surveyName = document.getElementById('surveyName').value;
    console.log(document.getElementById('dueDate').value);
    //converst dat to string and slices date
    const date = moment(document.getElementById('dueDate').value).format("MM/DD/YYYY").toString().slice(0,14);
    // var question = document.getElementById('questionFormm').value;
    // const anonToggle = document.getElementById('anonymousToggle').checked;
    //    var question = target.prompt.value;
    console.log(surveyName);
    console.log(date);
    // console.log(anonToggle);
    // console.log(inputs);

    Meteor.call("createNewSurvey", surveyName, date, function(error, result) {
      FlowRouter.go("/addQuestion/" + result);
    });
  }
});
// Template.questionFormTemplate.helpers({
//   questionData: function() {
//       var questionArray = Questions.find({}).fetch();
//   }
//
// });
Template.surveyFormTemplate.helpers({
  groups: function() {
    var allGroups = Groups.find({}).fetch();
    var formattedGroups = [];
    for (var i = 0; i < allGroups.length; i++) {
      var formattedGroup = {
        name: allGroups[i].name,
        id: allGroups[i]._id
      }
      formattedGroups.push(formattedGroup);
    }
    return formattedGroups;
  },
  students: function() {
    var allStudents = Student.find({}).fetch();
    var formattedStudents = [];
    for (var i = 0; i < allStudents.length; i++) {
      var student = allStudents[i];
      var formattedStudent = {
        name: student.name,
        id: student._id
      }
      formattedStudents.push(formattedStudent);
    }
    return formattedStudents;
  }
});

//May need to add more from newAssignment.js for group functionality
