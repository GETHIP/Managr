import { Template } from 'meteor/templating';

Template.aboutme.onCreated(function(){
    var self = this;
    self.autorun(function() {
      self.subscribe('Student');
    });
});

Template.aboutme.helpers({
    student: function(){
      var userId = FlowRouter.getParam("id");
      console.log(userId);
      var student = Student.findOne({"_id": "FwbA73GS9owiMivhS"});
      console.log(student)
      return student;
    },
    strengths: function(){
      var userId = FlowRouter.getParam("id");
      var strengths = Student.findOne({"_id": "FwbA73GS9owiMivhS"});
      console.log(strengths);
      return strengths.strengths;
    }
});
