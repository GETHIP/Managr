import { Surveys } from '../../collections/surveys.js';
import { Student } from '../../collections/student.js';

Template.individualResults.onCreated(function() {
  Meteor.subscribe("Student");
});

Template.surveysResults.helpers({
  name: function(){
      var studentName = Student.findOne({_id: FlowRouter.getParam('id')}).name;
      return studentName;
  }
});
