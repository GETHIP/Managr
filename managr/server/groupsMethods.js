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

    'createGroup': function(groupName, studentIds) {
      if(!isInstructor()) {
        return;
      }


      Groups.insert({
        name: groupName,
        studentIds: studentIds
      });
    },

		'updateGroup': function(groupId, groupName, studentIds) {
			if(!isInstructor()) {
				return;
			}

			Groups.update({_id: groupId}, {
				$set: {
					name: groupName,
					studentIds: studentIds
				}
      });
		}
	});
}
