import { Template } from 'meteor/templating';

Template.aboutme.onCreated(function(){
    var self = this;
    self.autorun(function() {
      self.subscribe('Student');
    });
});

Template.aboutme.helpers({
    student: function(){
      let userId = FlowRouter.getParam("id");
      let student = Student.findOne({"_id": userId});
      return student;
    },
    strengths: function(){
      let userId = FlowRouter.getParam("id");
      let student = Student.findOne({"_id": userId});
      let strengths = {};
      let stren = student.strengths;
      strengths.s1 = stren[0];
      strengths.s2 = stren[1];
      strengths.s3 = stren[2];
      strengths.s4 = stren[3];
      strengths.s5 = stren[4];
      return strengths;
    }
});
