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
      let strengths = Student.findOne({"_id": userId});
      let strnths = {};
      let stren = strengths.strengths;
      strnths.s1 = stren[0];
      strnths.s2 = stren[1];
      strnths.s3 = stren[2];
      strnths.s4 = stren[3];
      strnths.s5 = stren[4];
      return strngths;
    }
});
