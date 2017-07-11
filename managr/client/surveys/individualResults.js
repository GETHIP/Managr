import { Surveys } from '../../collections/surveys.js';
import { Student } from '../../collections/student.js';

Template.individualResults.onCreated(function() {
  Meteor.subscribe("Student");
  Meteor.subscribe("Surveys");
});

Template.individualResults.helpers({
  student: function(){
      console.log("Hi");
      var pathDef = "/individualResults/:surveyId/:studentId";
      var IdStudent = FlowRouter.getParam('studentId');
      var IdSurvey = FlowRouter.getParam('surveyId');
      var student = Student.findOne({userId: IdStudent});
      return student;
  },
  survey: function(){
    console.log("Hello");
    var pathDef = "/individualResults/:surveyId/:studentId";
    var IdStudent = FlowRouter.getParam('studentId');
    var IdSurvey = FlowRouter.getParam('surveyId');
    var survey = Surveys.findOne(IdSurvey);
    console.log(survey.questions);
    console.log(survey.questions[0].studentResults[0].answer);
    return survey;
  },
  choicetype: function(questionType) {
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
  isStudentId: function(anything) {
    if(anything == FlowRouter.getParam('studentId')){
      return true;
    }else{
      return false;
    }
  }
});
