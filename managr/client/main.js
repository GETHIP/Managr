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
      return strengths = Student.findOne({"_id": userId}).strengths;
    }
});

Template.attendance.onCreated(function(){
    var self = this;
    self.autorun(function(){
      self.subscribe('Student');
    });
});

Template.attendance.helpers({
    attendance: function(){
      let userId = FlowRouter.getParam("id");
      return attendance = Student.findOne({"_id": userId}).attendance;
    }
});

Template.studentName.onCreated(function(){
    var self = this;
    self.autorun(function(){
      self.subscribe('Student');
    });
});

Template.studentName.helpers({
    studentName: function(){
      let userId = FlowRouter.getParam("id");
      let studentName = {};
      studentName = Student.findOne({"_id": userId});
      return studentName;
    }
});

Template.assignments.onCreated(function(){
    var self = this;
    self.autorun(function(){
      self.subscribe('Student');
    });
});

Template.assignments.helpers({
    assignments: function(){
      let userId = FlowRouter.getParam("id");
      let assignments = {};
      assignments = Student.findOne({"_id": userId});
      return assignments;
    }
});

Template.editAboutMe.helpers({
    userId: function () {
      return userId = "window.location = \"/profile/edit/" + FlowRouter.getParam("id") + "\"";
    }
})
