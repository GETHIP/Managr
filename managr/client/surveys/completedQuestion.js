import { Surveys } from '../../collections/surveys.js';
import { Student } from '../../collections/student.js';
import { Groups } from '../../collections/groups.js';
import { Questions } from '../../collections/questions.js';

Template.completedQuestion.onCreated(function() {
  Meteor.subscribe("Student");
  Meteor.subscribe("Surveys");
  Meteor.subscribe("Questions");
});

Template.completedQuestion.helpers({
  questions: function(){
    var surveyId = FlowRouter.getParam('id');
    var allQuestionsArray = Surveys.find({'_id': "ebDxevcGYsjBMAFCM"}).questions;
    console.log("questions helper:");
    console.log(Surveys.find({'_id': "ebDxevcGYsjBMAFCM"}));
    return allQuestionsArray;
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

Template.completedQuestion.events({
  'click .deleteBtn': function(event){
    var question = Surveys.findOne({_id: event.currentTarget.id});
    Modal.show("deleteQuestion", question);
  }
});

// var questionArray = [];
// for(i = 0; i < allQuestionsArray.length; i++) {
//   if(option == 'choice') {
//     var eachQuestion = {
//         questionType:
//         name: group.name,
//         groupId: group._id
//     }
//     questionArray.question = questionArray[0];
//     questionArray.choice1 = questionArray[1];
//     questionArray.choice2 = questionArray[2];
//     questionArray.choice3 = questionArray[3];
//     questionArray.choice4 = questionArray[4];
//     return questionArray;
//   }
//   else if(option == 'check') {
//     questionArray.question = questionArray[0];
//     questionArray.option1 = questionArray[1];
//     questionArray.option2 = questionArray[2];
//     questionArray.option3 = questionArray[3];
//     questionArray.option4 = questionArray[4];
//     questionArray.option5 = questionArray[5];
//     return questionArray;
//
//   }
//   else if(option == 'shResp') {
//     questionArray.question = questionArray[0];
//     return questionArray;
//   }
// }
