import { Surveys } from '../../collections/surveys.js';
import { Student } from '../../collections/student.js';

Template.individualResults.onCreated(function() {
  Meteor.subscribe("Student");
});

Template.individualResults.helpers({
  name: function(){
      console.log(FlowRouter.path(pathDef, params));
      var urlIds = FlowRouter.path(pathDef, params);
      var formattedUrl = urlIds.substring(19);
      console.log(formattedUrl);
      for (var i = 0; i < formattedUrl.length; i++){
        if(formattedUrl.charAt(i).equals("//")){
          var IdSurvey = formattedUrl.substring(0, i);
          var IdStudent = formattedUrl.substring(i + 1);
        }
      }

      var studentName = Student.findOne({userId: IdStudent});
      return studentName;
  }
});
