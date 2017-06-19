import { Meteor } from 'meteor/meteor';
import { Posts } from '../collections/blogPosts.js';
import { Comments } from '../collections/comments.js';
import { Assignments } from '../collections/assignments.js';
import { Instructor } from '../collections/instructor.js';
import { Student } from '../collections/student.js';
import { Drafts } from '../collections/drafts.js';
import { Surveys } from '../collections/surveys.js';
import { isStudent, isInstructor, userIsValid, currentUserOrInstructor, nameOfUser } from '../lib/permissions.js';

export function eventsMethods() {
	Meteor.methods({
    'createNewSurvey': function(eventName, description, date, location) {
      if(!isInstructor()) {
        return;
      }
			Events.insert({
	      name: eventName,
	      description: description,
				date: date,
				location: location
	    });
    }
	});
}
