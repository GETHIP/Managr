import { Student } from '../../collections/student.js';
import { Events } from '../../collections/event.js';

Template.eventView.onCreated(function() {
		Meteor.subscribe("Student");
    Meteor.subscribe("Events");
});
//
// Template.eventView.events({
//   "submit #eventForm"(event) {
// 		event.preventDefault();
// 		var target = event.target;
//
// 		var eventId = FlowRouter.getParam("id");
// 		var hostId = "";
// 		var eventName = target.name.value;
// 		var description = target.description.value;
// 		var location = target.location.value;
// 		var newDate = moment(target.date.value);
// 		var formattedDate = moment(newDate).format("MMMM D,  YYYY [at] h:mm A");
// 		var date = target.date.value;
//
//     Meteor.call('updateEvent', eventId, eventName, description, date, formattedDate, location);
//
// 		FlowRouter.go('/events');
// 	}
// });

Template.eventView.events({
'click .slider': function(event){
  if(document.getElementById("indicator").innerHTML == "Attending"){
      document.getElementById("indicator").innerHTML = "Not Attending"
  }else{
      document.getElementById("indicator").innerHTML = "Attending"
  }
	console.log(indicator)
	}
});

Template.eventView.events({
	'click #rsvpEventButton': function(event){
	 event.preventDefault();
	 var target = event.target;

	 var eventId = FlowRouter.getParam("id");
	 var studentId = Student.findOne({userId: Meteor.user()._id});
	 var studentName = studentId.name;
	 var rsvp = document.getElementById("indicator").innerHTML;

	 console.log(eventId);
	 console.log(studentId);
	 console.log(studentName);
	 console.log(rsvp);

	//  INSERT INTO attendingTable VALUES ('{{studentName}}', '{{rsvp}}')

	 Meteor.call('sendRSVP', eventId, studentName, rsvp);

	 FlowRouter.go('/events');
	}
});

Template.eventView.helpers({
	host: function() {
		return getThisEvent().host;
	}
});

Template.eventView.helpers({
	eventName: function() {
		return getThisEvent().name;
	}
});

Template.eventView.helpers({
	indicator: function() {
		return getThisEvent().rsvp;
	}
});

Template.eventView.helpers({
	eventDescription: function() {
		return getThisEvent().description;
	}
});

Template.eventView.helpers({
	formattedDate: function() {
		return getThisEvent().formattedDate;
	}
});

Template.eventView.helpers({
	eventLocation: function() {
		return getThisEvent().location;
	}
});

var getThisEvent = function() {
	var id = FlowRouter.getParam("id");
	return Events.findOne({ _id: id });
}

import { Groups } from '../../collections/groups.js';

Template.eventView.helpers({
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
