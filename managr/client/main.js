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
      let assignments = [];
      assignments = Student.findOne({"_id": userId}).assignments;
      return assignments;
    }
});

Template.Profile.events({
    "click .editAboutMe"(event){
        window.location = "/profile/edit/" + FlowRouter.getParam("id");
    },
    "click .editAttendance"(event){
        window.location = "/attendance/edit/" + FlowRouter.getParam("id");
    }
});

Template.profileEdit.onCreated(function(){
    var self = this;
    self.autorun(function(){
      self.subscribe('Student');
    });
});

Template.profileEdit.events({
    "submit .profileEdit"(event){
      event.preventDefault();
      let userId = FlowRouter.getParam("id");
      const email = event.target.email.value;
      const age = event.target.age.value;
      const school = event.target.school.value;
      const getHipYear = event.target.getHipYear.value;
      var data = {
        email: email,
        age: age,
        school: school,
        getHipYear: getHipYear
      }
      Student.update({_id: userId}, {$set: data});
      window.location = "/profile/" + FlowRouter.getParam("id");
    }
});

Template.profileEdit.helpers({
    data: function(){
      let userId = FlowRouter.getParam("id");
      let data = Student.findOne({"_id": userId});
      return data;
    }
});

Template.attendanceUpdate.events({
    "submit .attendanceUpdate"(event){
      event.preventDefault();
      console.log("form submitted")
      let userId = FlowRouter.getParam("id");
      let data = [];
      for(i=1;i<13;i++){
        let week = event.target["week"+i];
        week = week.value;
        if(week === "True"){
            data.push(true);
        }else{
            data.push(false);
        }
      }
      console.log(data);
      Student.update({_id: userId}, {$set: {attendance: data}});
      window.location = "/profile/" + FlowRouter.getParam("id");
    }
});
