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
    console.log(event);
    var studentId = Student.findOne({userId: Meteor.userId()}).userId;
    FlowRouter.go('/individualResults/' + studentId)
  }
});
Template.viewSurveyPage.events({
  'click #sendResponse'(){
    var surveyId = FlowRouter.getParam("id");
    Meteor.call('incCompletedSurveyCt', surveyId);
  }
});
var findStudentSurvey = function() {
  var surveyId = FlowRouter.getParam("id");
  var student = Student.findOne({userId: Meteor.user()._id});
  var studentSurveys = student.surveys;
  for(var i = 0; i < studentSurveys.length; i++) {
    if(studentSurveys[i].surveyId == surveyId) {
      return studentSurveys[i];
    }
  }
  return undefined;
}
Template.surveysResults.helpers({
  'survey': function(){
    var surveyId = FlowRouter.getParam("id");
    console.log(Surveys.find({_id: surveyId}).fetch()[0])
    return Surveys.find({_id: surveyId}).fetch()[0];
  },
  students: function(){
    var allStudents = Student.find({}).fetch();
    var formattedStudents = [];
    for (var i = 0; i < allStudents.length; i++) {
      var student = allStudents[i];
      console.log(student);
      console.log("~~~~~~~~~~~~~~~~~~~~~~~");
      try{
        var studentSurvey = findStudentSurvey();
        console.log(student);
        console.log(studentSurvey);
        console.log("===========================");
      } catch(err) {
        console.log(err.message);
      }
      var studentStatus = "Incomplete";
      try{
        if(studentSurvey.completed == true){
          var studentStatus = "Complete";
        }
      } catch(err) {
        console.log("-------------1--------------");
        console.log(err.message);
        console.log("-------------1--------------");
      }
      var formattedStudent = {
        name: student.name,
        status: studentStatus
      }
      formattedStudents.push(formattedStudent);
    }
    console.log(formattedStudents);
    return formattedStudents;
  },
  questions: function(){
    var surveyId = FlowRouter.getParam('id');
    var allQuestionsArray = Surveys.findOne(surveyId);
    console.log("questions helper:");
    console.log(allQuestionsArray);
    console.log(allQuestionsArray.questions);
    return allQuestionsArray.questions;
  },
  choicetype: function(questionType){
    console.log(questionType);
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
