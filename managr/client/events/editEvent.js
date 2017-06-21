import { Student } from '../../collections/student.js';
import { Events } from '../../collections/event.js';

Template.editEvent.onCreated(function() {
		Meteor.subscribe("Student");
    Meteor.subscribe("Events");
});

Template.editEvent.events({
  "submit #eventForm"(event) {
		event.preventDefault();
		var target = event.target;

		var eventId = FlowRouter.getParam("id");
		var hostId = "";
		var eventName = target.name.value;
		var description = target.description.value;
		var location = target.location.value;
		var newDate = moment(target.date.value);
		var formattedDate = moment(newDate).format("MMMM D,  YYYY [at] h:mm A");
		var date = target.date.value;

    Meteor.call('updateEvent', eventId, eventName, description, date, formattedDate, location);

		FlowRouter.go('/events');
	}
});

Template.editEvent.helpers({
	eventName: function() {
		return getThisEvent().name;
	}
});

Template.editEvent.helpers({
	eventDescription: function() {
		return getThisEvent().description;
	}
});

Template.editEvent.helpers({
	eventDate: function() {
		return getThisEvent().date;
	}
});

Template.editEvent.helpers({
	eventLocation: function() {
		return getThisEvent().location;
	}
});

var getThisEvent = function() {
	var id = FlowRouter.getParam("id");
	return Events.findOne({ _id: id });
}

import { Groups } from '../../collections/groups.js';

Template.editEvent.helpers({
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
