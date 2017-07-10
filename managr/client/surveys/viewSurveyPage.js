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
    console.log(Surveys.find({_id: surveyId}).fetch())
    return Surveys.find({_id: surveyId}).fetch()[0];
  },
  questions: function(){
    var surveyId = FlowRouter.getParam('id');
    var allQuestionsArray = Surveys.findOne(surveyId);
    console.log(allQuestionsArray);
    var data = allQuestionsArray.questions;
    console.log(data);
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
          console.log(formattedOpt);
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
  'click #sendResponseBtnn': function(event){

    var mcAnswer;
    var cbAnswer;
    var srAnswer;
    var surveyId = FlowRouter.getParam('id');
    Meteor.call("incCompletedSurveyCt", surveyId);

    for(var i = 0; i < idS.length; i++)
    {
      if(idS[i].questionType == 'choice')
      {
        for(var j = 0; j < idS[i].options.length; j++)
        {
          console.log(idS[i].options[j].name);
          console.log(idS[i].options[j].refId);
          mcAnswer = idS[i].options[j];
          if(document.getElementById(mcAnswer.refId).checked)
          {
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
            Meteor.call("sendResponse", surveyId, idS[i], idS[i].dateHash, mcAnswer.name);
            break;
          }
        }
      }
      else if(idS[i].questionType == 'check')
      {
        for(var j = 0; j < idS[i].options.length; j++)
        {
          console.log(idS[i].options[j].name);
          console.log(idS[i].options[j].refId);
          cbAnswer = idS[i].options[j];
          if(document.getElementById(cbAnswer.refId).checked)
          {
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
            Meteor.call("sendResponse", surveyId, idS[i], idS[i].dateHash, cbAnswer.name);
          }
        }
      }
      else if(idS[i].questionType == 'shResp')
      {
        console.log("FRQ");
        srAnswer = document.getElementById("shRespAnswer").value;
        console.log(srAnswer);
        Meteor.call("sendResponse", surveyId, idS[i], idS[i].dateHash, srAnswer);
      }

    }
    console.log(idS.length);
    FlowRouter.go("/assignments");
  }
});
