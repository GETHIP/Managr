import { Surveys } from '../../collections/surveys.js';
import { Student } from '../../collections/student.js';
import { Random } from 'meteor/random'
var idS =[];

Template.surveysResults.onCreated(function() {
  Meteor.subscribe("Surveys", function() {
    var survey = Surveys.findOne({_id: FlowRouter.getParam("id")});
    // if(survey == undefined) {
    //     FlowRouter.go("/surveys");
    // }
  });
  Meteor.subscribe("Student");
});

Template.viewSurveyPage.helpers({
  'survey': function(){
    var surveyId = FlowRouter.getParam("id");
    console.log(Surveys.find({_id: surveyId}).fetch())
    return Surveys.find({_id: surveyId}).fetch()[0];
  },
  questions: function(){
    var surveyId = FlowRouter.getParam('id');
    var allQuestionsArray = Surveys.findOne(surveyId);
    console.log("questions helper:");
    console.log(allQuestionsArray);
    console.log(allQuestionsArray.questions);
    var data = allQuestionsArray.questions;
    console.log(data.options);
    console.log(data.length);
    data.forEach(function(element){
      var Alloptions = element.options;
      console.log(Alloptions);
      var NewOptions = [];
      Alloptions.forEach(function(opt){
         var formattedOpt = {
           name: opt,
           refId: Random.id()
         }
         console.log(formattedOpt);
         NewOptions.push(formattedOpt);
      });
      element.options = NewOptions;
      idS.push(element);
    });
    console.log(idS);
    return idS;
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
  }
});

Template.viewSurveyPage.events({
  'click #sendResponse': function(event){
    var mcAnswer;
    var surveyId = FlowRouter.getParam('id');
    var allQuestionsArray = Surveys.findOne(surveyId);
    var data = allQuestionsArray.questions;
    console.log(idS);

    // data.forEach(function(element){
    //
    //   console.log(element.options);
    //   for(var j = 0; j < element.options.length; j++)
    //   {
    //     mcAnswer = element.options[j].refId;
    //     if(document.getElementById(mcAnswer).checked)
    //     {
    //       console.log("Option Selected");
    //       console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    //       Meteor.call("sendResponses", surveyId, mcAnswer);
    //     }
    //   }
    // });

    for(var i = 0; i < idS.length; i++)
    {
      console.log(idS[i].options);
      for(var j = 0; j < idS[i].options.length; j++)
      {
        console.log(idS[i].options[j].option);
        console.log(idS[i].options[j].refId);
        mcAnswer = idS[i].options[j];
        if(document.getElementById(mcAnswer.refId).checked)
        {
          console.log("Option Selected");
          console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
          Meteor.call("sendResponse", surveyId, data[i], data[i].dateHash, mcAnswer.option);
          break;
        }
      }
    }
    // FlowRouter.go('/surveys');
  }
});
