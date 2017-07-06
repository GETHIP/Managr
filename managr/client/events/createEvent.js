import { Student } from '../../collections/student.js';
import { Instructor } from '../../collections/instructor.js';
import { Events } from '../../collections/event.js';

Template.createEvent.onCreated(function() {
    Meteor.subscribe("Student");
    Meteor.subscribe("Events");
    Meteor.subscribe("Instructor");
    Meteor.subscribe("Groups");
});

Template.createEvent.events({
  "submit #eventForm"(event) {
    event.preventDefault();
    var target = event.target;

    var hostId = Instructor.findOne({userId: Meteor.userId()}).userId;
    var host = Instructor.findOne({userId: Meteor.userId()}).name;
    var eventName = target.name.value;
    var description = target.description.value;
    var location = target.location.value;
    var newDate = moment(target.date.value);
    var formattedDate = moment(newDate).format("MMMM D,  YYYY [at] h:mm A");
    var date = target.date.value;

    const form = event.target;

    // var groupName = form.groupName.value;
    var inputs = document.getElementsByTagName("INPUT");

    var studentIds = [];
    for(var i = 0; i < inputs.length; i++) {
        if(inputs[i].type == "checkbox" && inputs[i].checked) {
            //Because if it is a valid group, then that implies it is not a student, so we don't want this in our studentIds array
            var group = Groups.findOne({_id: inputs[i].id});
            if(group != undefined) {
                continue;
            }
            studentIds.push(inputs[i].id);
        }
    }
    // var size = studentIds.length;
    // var studentNames = newformatStudentsForGroup(studentIds);
    // // Stores date as a number (number of milliseconds since 1970)
    // var dateCreated = new Date().getTime()

    console.log(hostId);
    console.log(host);
    console.log(eventName);
    console.log(description);
    console.log(location);
    console.log(date);
    console.log(formattedDate);
    console.log(studentIds);


    Meteor.call("createNewEvent", hostId, host, eventName, description, date, formattedDate, location, studentIds);

    FlowRouter.go('/events');
  }
});

import { Groups } from '../../collections/groups.js';

Template.createEvent.helpers({
  groups: function() {
      var allGroups = Groups.find({}).fetch();
      var formattedGroups = [];
      for (var i = 0; i < allGroups.length; i++) {
          var formattedGroup = {
              name: allGroups[i].name,
              id: allGroups[i]._id
          }
          formattedGroups.push(formattedGroup);
      }
      return formattedGroups;
  },
    students: function() {
        var allStudents = Student.find({}).fetch();
        var formattedStudents = [];
        for(var i = 0; i < allStudents.length; i++) {
            var student = allStudents[i];
            var formattedStudent = {
                name: student.name,
                studentId: student._id
            }
            formattedStudents.push(formattedStudent);
        }
        return formattedStudents;
    }
});

var newformatStudentsForGroup = function(studentIds) {
    var formattedStudents = [];

    for(var i = 0; i < studentIds.length; i++) {
        var student = Student.findOne({_id: studentIds[i]});
        if(student == undefined) {
            continue;
        }
        name = student.name;
        formattedStudents.push(name);
    }
    return formattedStudents;
};
