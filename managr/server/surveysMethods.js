import { Meteor } from 'meteor/meteor';
import { Posts } from '../collections/blogPosts.js';
import { Comments } from '../collections/comments.js';
import { Assignments } from '../collections/assignments.js';
import { Instructor } from '../collections/instructor.js';
import { Student } from '../collections/student.js';
import { Drafts } from '../collections/drafts.js';
// import { Events } from '../collections/event.js';
import { Surveys } from '../collections/surveys.js';
import { isStudent, isInstructor, userIsValid, currentUserOrInstructor, nameOfUser } from '../lib/permissions.js';

export function surveysMethods() {
	Meteor.methods({
    'createNewSurvey': function(surveyName, date) {
      if(!isInstructor()) {
        return;
      }
			Surveys.insert({
	      name: surveyName,
				dueDate: date
	    });
    },
	});
}
