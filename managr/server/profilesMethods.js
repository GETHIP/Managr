import { Meteor } from 'meteor/meteor';
import { Posts } from '../collections/blogPosts.js';
import { Comments } from '../collections/comments.js';
import { Assignments } from '../collections/assignments.js';
import { Instructor } from '../collections/instructor.js';
import { Student } from '../collections/student.js';
import { Drafts } from '../collections/drafts.js';
import { isStudent, isInstructor, userIsValid, currentUserOrInstructor, nameOfUser } from '../lib/permissions.js';

function validateBlogsLink(data) {
    if (data.blog == undefined || data.blog == "") {
        //We do allow empty blog links.
        return;
    }
    var httpRegex = /^https?:\/\//;
    data.blog = data.blog.trim();
    if (!httpRegex.test(data.blog)) {
        data.blog = "https://" + data.blog;
    }
}

export function profilesMethods() {

	Meteor.methods({
		'updateStudent': function(id, data){
			if (data.name == "") {
				return;
			}
            validateBlogsLink(data);
			Student.update({_id: id}, {$set: data}, {removeEmptyStrings: false});
		},
		'updateAttendance':function(id, attendance) {
			if (!currentUserOrInstructor(id)) {
				return;
			}
			Student.update({userId: id}, { $set: { attendance: attendance } });
		},
		'updateProfilePicture':function(id, picture) {
			var student = Student.findOne({_id: id});
			if (student.userId == Meteor.userId()) {
				Student.update({_id: id, userId: Meteor.userId()}, { $set: { picture: picture }});
			} else if (isInstructor()) {
				Student.update({_id: id}, { $set: { picture: picture }});
			}
		}
	});

}
