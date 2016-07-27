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

    'createGroup': function(groupName, groupIds, studentIds) {
      if(!isInstructor()) {
        return;
      }

			var studentIdsArray = createStudentIdsArray(groupIds, studentIds);

      Groups.insert({
        name: groupName,
        studentIds: studentIdsArray
      });
    },

		'updateGroup': function(groupId, groupName, groupIds, studentIds) {
			if(!isInstructor()) {
				return;
			}

			var studentIdsArray = createStudentIdsArray(groupIds, studentIds);

			Groups.update({_id: groupId}, {
				$set: {
					name: groupName,
					studentIds: studentIdsArray
				}
      });
		}
	});
}

export function createStudentIdsArray(groupIds, studentIds) {
	var studentIdsArray = [];
	//First add all students from the groups
	for(var i = 0; i < groupIds.length; i++) {
		var group = Groups.findOne({_id: groupIds[i]});
		if(group == undefined) {
			continue;
		}

		var studentIdsInGroup = group.studentIds;
		for(var j = 0; j < studentIdsInGroup.length; j++) {
			if(studentIdsArray.indexOf(studentIdsInGroup[j]) == -1) {
				studentIdsArray.push(studentIdsInGroup[j]);
			}
		}
	}

	//Now add all the students that are just standalone
	for(var i = 0; i < studentIds.length; i++) {
		if(studentIdsArray.indexOf(studentIds[i]) == -1) {
			studentIdsArray.push(studentIds[i]);
		}
	}
	return studentIdsArray;
}
