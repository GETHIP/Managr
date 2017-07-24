import { Surveys } from '../../collections/surveys.js';
import { Student } from '../../collections/student.js';
import { Random } from 'meteor/random'

var idS = [];

Template.viewSurveyPage.onCreated(function() {
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
    return Surveys.find({_id: surveyId}).fetch()[0];
  },
  questions: function(){
    var surveyId = FlowRouter.getParam('id');
    var allQuestionsArray = Surveys.findOne(surveyId);
    var data = allQuestionsArray.questions;
    data.forEach(function(element){
      if(element.questionType == 'choice' || element.questionType == 'check')
      {
        var Alloptions = element.options;
        var NewOptions = [];
        Alloptions.forEach(function(opt){
          var formattedOpt = {
            name: opt,
            refId: Random.id()
          }
          NewOptions.push(formattedOpt);
        });
        element.options = NewOptions;
        idS.push(element);
      }
      else if(element.questionType == 'shResp')
      {
        idS.push(element);
      }
    });
    return idS;
  },
  choicetype: function(questionType) {
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
  'click #sendResponseBtnn': function(event){

    var mcAnswer;
    var cbAnswer;
    var srAnswer;
    var surveyId = FlowRouter.getParam('id');

    for(var i = 0; i < idS.length; i++)
    {
      if(idS[i].questionType == 'choice')
      {
        for(var j = 0; j < idS[i].options.length; j++)
        {
          mcAnswer = idS[i].options[j];
          if(document.getElementById(mcAnswer.refId).checked)
          {
            Meteor.call("sendResponse", surveyId, idS[i], idS[i].dateHash, mcAnswer.name);
            break;
          }
        }
      }
      else if(idS[i].questionType == 'check')
      {
        for(var j = 0; j < idS[i].options.length; j++)
        {
          cbAnswer = idS[i].options[j];
          if(document.getElementById(cbAnswer.refId).checked)
          {
            Meteor.call("sendResponse", surveyId, idS[i], idS[i].dateHash, cbAnswer.name);
          }
        }
      }
      else if(idS[i].questionType == 'shResp')
      {
        srAnswer = document.getElementById("shRespAnswer").value;
        Meteor.call("sendResponse", surveyId, idS[i], idS[i].dateHash, srAnswer);
      }

    }
    FlowRouter.go("/assignments");
  }
});
