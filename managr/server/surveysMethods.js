import { Meteor } from 'meteor/meteor';
import { Posts } from '../collections/blogPosts.js';
import { Comments } from '../collections/comments.js';
import { Assignments } from '../collections/assignments.js';
import { Instructor } from '../collections/instructor.js';
import { Student } from '../collections/student.js';
import { Drafts } from '../collections/drafts.js';
import { Questions } from '../collections/questions.js';
// import { Events } from '../collections/event.js';
import { Surveys } from '../collections/surveys.js';
import { isStudent, isInstructor, userIsValid, currentUserOrInstructor, nameOfUser } from '../lib/permissions.js';

export function surveysMethods() {
	Meteor.methods({
		'removeQuestion': function(id) {
			if(!isInstructor()) {
				return;
			}
			Questions.remove(id);
		},
    'createNewSurvey': function(surveyName, date, question) {
      if(!isInstructor()) {
        return;
      }
			Surveys.insert({
	      name: surveyName,
				dueDate: date,
				questions: [questionArray]
	    });
    },
		'addQuestion': function(option, question, temparray) {
			console.log(temparray);
			if(!isInstructor()) {
				return;
			}
			if(option == 'choice') {
				// var question = temparray[0];
				// var choice1 = temparray[1];
				// var choice2 = temparray[2];
				// var choice3 = temparray[3];
				// var choice4 = temparray[4];

				Questions.insert({
					questionType: "choice",
					prompt: question,
					options: temparray
				});
			}
			else if(option == 'check') {
				// var question = temparray[0];
				// var option1 = temparray[1];
				// var option2 = temparray[2];
				// var option3 = temparray[3];
				// var option4 = temparray[4];
				// var option5 = temparray[5];
				console.log(option);
				Questions.insert({
					questionType: "check",
					prompt: question,
					options: temparray
				});
			}
			else if(option == 'shResp') {
				// var question = temparray[0];
				// var count = temparray[1];
				console.log(option);
				Questions.insert({
					questionType: "shResp",
					prompt: question
				});
			}
		}
	});
}
