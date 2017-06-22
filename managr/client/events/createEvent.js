import { Student } from '../../collections/student.js';
import { Instructor } from '../../collections/instructor.js';
import { Events } from '../../collections/event.js';

Template.createEvent.onCreated(function() {
    Meteor.subscribe("Student");
    Meteor.subscribe("Events");
    Meteor.subscribe("Instructor");
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

    console.log(eventName);
    console.log(description);
    console.log(location);
    console.log(date);
    console.log(formattedDate);

    Meteor.call("createNewEvent", hostId, host, eventName, description, date, formattedDate, location);

    FlowRouter.go('/events');
  }
});

import { Groups } from '../../collections/groups.js';

Template.createEvent.helpers({
    groups: function() {
        var allGroups = Groups.find({}).fetch();
        var formattedGroups = [];
        for(var i = 0; i < allGroups.length; i++) {
            var group = allGroups[i];
            var formattedGroup = {
                name: group.name,
                groupId: group._id,
								size: group.size,
								leader: group.leader
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
}
