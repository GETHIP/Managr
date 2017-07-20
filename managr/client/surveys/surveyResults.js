import { Surveys } from '../../collections/surveys.js';
import { Student } from '../../collections/student.js';

Template.surveysResults.onCreated(function() {
  Meteor.subscribe("Surveys", function() {
    var survey = Surveys.findOne({_id: FlowRouter.getParam("id")});
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
});
Template.surveysResults.events({
  'click .result'(event){
    event.preventDefault();

    var studId = this.userId;
    var pathDef = "/individualResults/:surveyId/:studentId";
    var params = {surveyId: FlowRouter.getParam('id'), studentId: studId}
    FlowRouter.go('/individualResults/' + FlowRouter.getParam('id') + "/" + studId)
  }
});
Template.viewSurveyPage.events({
  'click #sendResponseBtnn'(){
    var surveyId = FlowRouter.getParam("id");
    Meteor.call('incCount', surveyId);
  }
});
// var findStudentSurvey = function() {
//   var surveyId = FlowRouter.getParam("id");
//   var student = Student.findOne({userId: Meteor.user()._id});
//   var studentSurveys = student.surveys;
//   for(var i = 0; i < studentSurveys.length; i++) {
//     if(studentSurveys[i].surveyId == surveyId) {
//       return studentSurveys[i];
//     }
//   }
//   return undefined;
// }
  Template.surveysResults.helpers({
    'survey': function(){
      var surveyId = FlowRouter.getParam("id");
      return Surveys.find({_id: surveyId}).fetch()[0];
    },
    total: function(){
      var Survey = Surveys.findOne(FlowRouter.getParam('id'));
      var AllQuestions = Survey.questions;
      var AllOptions = AllQuestions.options;

    },
    students: function(){
      var allStudents = Student.find({}).fetch();
      var surveyId = FlowRouter.getParam("id");
      var currentSurvey = Surveys.findOne(surveyId);
      var questions = currentSurvey.questions;
      var quest = questions[0];
      var resultsArr = quest.studentResults;
      var formattedStudents = [];
      for (var i = 0; i < allStudents.length; i++) {
        var student = allStudents[i];
        var studentStatus = "Incomplete";
        for(var j = 0; j < resultsArr.length; j++){
          if(student.userId == resultsArr[j].studentId){
            studentStatus = "Complete";
          }
        }
        var formattedStudent = {
          name: student.name,
          status: studentStatus,
          userId: student.userId,
          surveyId: FlowRouter.getParam('id')
        }
        formattedStudents.push(formattedStudent);
      }
      return formattedStudents;
    },
    questions: function(){
      var surveyId = FlowRouter.getParam('id');
      var allQuestionsArray = Surveys.findOne(surveyId);
      return allQuestionsArray.questions;
    },
    choicetype: function(questionType){
      if(questionType == "choice") {
        return true;
      }
    },
    checktype: function(questionType) {
      if(questionType == "check") {
        return true;
      }
    },
    shResptype: function(questionType) {
      if(questionType == "shResp") {
        return true;
      }
    },
    getDomain: function() {
      return window.location.hostname+(location.port ? ':'+location.port: '');
    },
    getUrl: function() {
      var current = window.location.href;
      var currentArray = current.split('/');
      return currentArray[currentArray.length-1];
    },
    surveyPath: function() {
      var post = this;
      var params = {
        category: post.category,
        postId: post._id
      };
      var queryParams = {comments: "yes"};
      var routeName = "completeSurvey";
      var path = FlowRouter.path(routeName, params, queryParams);

      return path;
    }
  });
