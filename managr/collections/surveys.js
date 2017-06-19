import { Mongo } from 'meteor/mongo';

export const Surveys = new Mongo.Collection('Surveys');

/*(Assignments.allow({
  insert: function(userId, doc) {
    if(Meteor.user.findOne({_id: userId})._id ===  Meteor.user()._id) {
      return true;
    }
    return false;
  },
  update: function(userId, doc) {
    return true;
  },
  remove: function(userId, doc) {
    return true;
  }
});*/
question = new SimpleSchema({
	questionType: {
		type: String
	},
	prompt: {
		type: String
	},
	options: {
		type: [String]
	}
});

options = new SimpleSchema({
	text: {
		type: String
	},
	controlType: {
		type: String
	}

})

Surveys.schema = new SimpleSchema({
    title: {
        type: String,
        optional: false
    },
    dueDate: {
        type: Date,
        optional: false
    },
    studentsCompleted: {
        type: Number,
        optional: true
    },
    studentsAssigned: {
        type: [String],
        optional: false
    },
    questions: {
      type: [question]
		},
		surveyId: {
				type: String,
				optional: true
		},
});

Surveys.attachSchema(Surveys.schema);

//events Methods
// import { Meteor } from 'meteor/meteor';
// import { Posts } from '../collections/blogPosts.js';
// import { Comments } from '../collections/comments.js';
// import { Assignments } from '../collections/assignments.js';
// import { Instructor } from '../collections/instructor.js';
// import { Student } from '../collections/student.js';
// import { Drafts } from '../collections/drafts.js';
// import { Events } from '../collections/event.js';
// import { isStudent, isInstructor, userIsValid, currentUserOrInstructor, nameOfUser } from '../lib/permissions.js';
//
// export function eventsMethods() {
// 	Meteor.methods({
//     'createNewEvent': function(eventName, description, date, location) {
//       if(!isInstructor()) {
//         return;
//       }
// 			Events.insert({
// 	      name: eventName,
// 	      description: description,
// 				date: date,
// 				location: location
// 	    });
//     }
// 	});
// }

//create event.js
import { Student } from '../../collections/student.js';
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
    var location = target.location.value;
    var date = target.date.value;

    console.log(eventName);
    console.log(description);
    console.log(location);
    console.log(date);

    Meteor.call("createNewEvent", eventName, description, date, location);

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

//create event.html
<template name="createEvent">

	<div class="containerDiv form marginContainer">
		<div class="containerDiv form">

			<form id="eventForm">
				<div class="containerDiv formbg cep">
          <div class="createHeading">
            <p id="welcome">Create Your Event</p>
            <p id="lineP"></p>
          </div>
          <div class ="formdashboardContainer">
					<p>Event Name:</p>
					<input id="createEventBox" type="text" name="name" placeholder="Name Of Your Event" required>
					<p>Description:</p>
					<textarea id="createEventBox" name="description" rows="6" placeholder="Describe Your Event" required></textarea>
					<p>When:</p>
					<input id="createEventBox" type="datetime-local" name="date" required>
					<p>Location:</p>
					<input id="createEventBox" type="text" name="location" placeholder="Where's Your Event?" autofocus required>
					<p>Invite:</p>

					{{#each students}}
							<label for="{{studentId}}"><input type="checkbox" id="{{studentId}}"/> {{name}}</label>
					{{/each}}

        </div>
       </div>
			 <button type="button" id="eventCancel" class="buttonStyle cancelUserCreate leftFloatingButton" onclick="FlowRouter.go('/events');">Cancel</button>
			 <button type="submit" id="createEventButton" value="Create" class="buttonStyle cancelUserCreate rightFloatingButton">Create My Event</button>
			</form>
		</div>
</div>
</template>
