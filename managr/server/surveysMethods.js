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
		'removeQuestion': function(id, index) {
			if(!isInstructor()) {
				return;
			}

			var thisSurvey = Surveys.findOne({"_id": id});
			var questions = thisSurvey.questions;
			// var co
		},
		// 'deleteComment': function(id, index) {
		// 	var comments = Posts.findOne({"_id": id}).comments;
		// 	var correctId = comments[index].authorId;
		// 	if(currentUserOrInstructor(correctId)) {
		// 		comments.splice(index, 1);
		// 		Posts.update({"_id": id}, {$set : {comments : comments}});
		// 	}
		// },
		'createNewSurvey': function(surveyName, date, anonToggle) {
			if(!isInstructor()) {
				return;
			}
			Surveys.insert({
				name: surveyName,
				dueDate: date
			});
		},
		'addQuestion': function(surveyId, option, question, temparray) {
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

				Surveys.update({_id: surveyId}, {
					$push: {
						questions: {
							questionType: "choice",
							prompt: question,
							options: temparray
						}
					}
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
				Surveys.update({_id: surveyId}, {
					$push: {
						questions: {
							questionType: "check",
							prompt: question,
							options: temparray
						}
					}
				}
			);
		}
		else if(option == 'shResp') {
			// var question = temparray[0];
			// var count = temparray[1];
			console.log(option);
			Surveys.update({_id: surveyId}, {
				$push: {
					questions: {
						questionType: "shResp",
						prompt: question
					}
				}
			});
		}
	}
	});
}
