import { Student } from '../../collections/student.js';
<<<<<<< HEAD
import { Events } from '../../collections/event.js';

Template.createEvent.onCreated(function() {
    Meteor.subscribe("Student");
    Meteor.subscribe("Events");
});

Template.createEvent.events({
  "submit #eventForm"(event) {
    event.preventDefault();
    var target = event.target;

    var eventName = target.name.value;
    var description = target.description.value;

    console.log(eventName);
    console.log(description);

    Meteor.call("createNewEvent", eventName, description);

    FlowRouter.go('/events');
  }
});
=======
import { Groups } from '../../collections/groups.js';

Template.createEvent.onCreated(function() {
		Meteor.subscribe("Student");
    Meteor.subscribe("Groups");
});

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
>>>>>>> 32856ccd9982c2244eb9727087ff474633044428
