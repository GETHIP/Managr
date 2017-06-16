import { Meteor } from 'meteor/meteor';
import { Posts } from '../collections/blogPosts.js';
import { Comments } from '../collections/comments.js';
import { Assignments } from '../collections/assignments.js';
import { Instructor } from '../collections/instructor.js';
import { Student } from '../collections/student.js';
import { Drafts } from '../collections/drafts.js';
import { Groups } from '../collections/groups.js';
import { isStudent, isInstructor, userIsValid, currentUserOrInstructor, nameOfUser } from '../lib/permissions.js';

export function groupsMethods() {
	Meteor.methods({
    'removeGroup': function(groupId) {
      if(!isInstructor()) {
        return;
      }
      Groups.remove(groupId);
    },

    'createGroup': function(groupName, studentIds, size, studentNames, dateCreated) {
      if(!isInstructor()) {
        return;
      }
			var stringSize = size.toString();
      Groups.insert({
        name: groupName,
        studentIds: studentIds,
				size: size,
				stringSize: stringSize,
				studentNames: studentNames,
				dateCreated: dateCreated
      });
    },

		'updateGroup': function(groupId, groupName, studentIds, size, studentNames) {
			if(!isInstructor()) {
				return;
			}
			var stringSize = size.toString();
			Groups.update({_id: groupId}, {
				$set: {
					name: groupName,
					studentIds: studentIds,
					size: size,
					stringSize: stringSize,
					studentNames: studentNames
				}
      });
		}
//
// // TAKE THIS OUT LATER ---- FOR EVENTS
// 		'createNewEvent': function(eventName, description) {
// 			if(!isInstructor()) {
// 				return;
// 			}
// 			Events.insert({
// 				name: eventName,
// 				description: description
// 			});
// 		}
	});
}
