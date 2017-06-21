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
    'createNewEvent': function(eventName, description, date, location, formattedDate) {
      if(!isInstructor()) {
        return;
      }
			Events.insert({
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
	// 'delEvent': function(id) {
	// 	correctId = Events.findOne({_id: id}).hostId;
	// 	if(correctId == Meteor.userId()){
	// 		Events.remove({_id: id});
	// 	}
	// },

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
