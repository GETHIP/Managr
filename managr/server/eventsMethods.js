import { Meteor } from 'meteor/meteor';
import { Posts } from '../collections/blogPosts.js';
import { Comments } from '../collections/comments.js';
import { Assignments } from '../collections/assignments.js';
import { Instructor } from '../collections/instructor.js';
import { Student } from '../collections/student.js';
import { Drafts } from '../collections/drafts.js';
import { Events } from '../collections/event.js';
import { isStudent, isInstructor, userIsValid, currentUserOrInstructor, nameOfUser } from '../lib/permissions.js';

export function eventsMethods() {
	Meteor.methods({
		'removeEvent': function(eventId) {
      if(!isInstructor()) {
        return;
      }
      Events.remove(eventId);
    },
		'sendRSVP': function(eventId, studentId, rsvp, type) {
			var result;
			if(!isStudent()) {
				return;
			}
			console.log("asdf");
			if(rsvp == "Attending"){
				result = true;
			}else if(rsvp == "Not Attending"){
				result = false;
			}

			if(type == true){
				Events.update({_id: eventId}, {
					$pull: {rsvp: {_id: studentId}}
				});

				Events.update({_id: eventId}, {
					$push: {rsvp: {_id: studentId, rsvp: result}}
				});

			}else{
			Events.update({_id: eventId}, {
				$push: {rsvp: {_id: studentId, rsvp: result}}
			});
		}
		},
    'createNewEvent': function(hostId, host, eventName, description, date, formattedDate, location) {
      if(!isInstructor()) {
        return;
      }
			Events.insert({
				hostId: hostId,
				host: host,
	      name: eventName,
	      description: description,
				date: date,
				formattedDate: formattedDate,
				location: location
			});
    },
			'updateEvent': function(eventId, eventName, description, date, formattedDate, location) {
				if(!isInstructor()) {
					return;
				}
				Events.update({_id: eventId}, {
					$set: {
						name: eventName,
			      description: description,
						date: date,
						formattedDate: formattedDate,
						location: location
					}
				});
			}
		});
	}


// export function eventsMethods() {
// 	Meteor.methods({
// 'createNewEvent': function(eventName, description, date, location) {
// 		  if(!isInstructor()) {
//         return;
//       }
// 			Events.insert({
// 	      name: eventName,
// 	      description: description,
// 				date: date,
// 				location: location,
// 				formattedDate: formattedDate
// 	    });
//     }
// 	});
// }
// 'delEvent': function(id) {
//   correctId = Events.findOne({"_id": id}).authorId;
//   if(correctId == Meteor.userId()){
// 	Events.remove({"_id": id});
//   }
// },
