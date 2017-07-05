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
import { createStudentIdsArray }  from './groupsMethods.js';

export function surveysMethods() {
	Meteor.methods({
		'removeQuestion': function(surveyId, dateHash) {
			if(!isInstructor()) {
				return;
			}
			console.log(surveyId);
			console.log(dateHash);
			Surveys.update({_id: surveyId}, {
				$pull: {
					questions: {
						"dateHash": dateHash
					}
				}
			});
		},
//Reference assignmentMethods.js - 'removeAssignment' function
		'removeSurvey':function(surveyId) {
			if (!isInstructor()) {
				return;
			}
			Surveys.remove(surveyId);
		},
		'createNewSurvey': function(surveyName, date, anonToggle) {
			if(!isInstructor()) {
				return;
			}
			return Surveys.insert({
				name: surveyName,
				dueDate: date
			});
		},
		'addQuestion': function(surveyId, option, question, temparray) {
			var dateHash = new Date().getTime();
			console.log(dateHash);
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
							options: temparray,
							dateHash: dateHash,
							studentResults: []
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
							options: temparray,
							dateHash: dateHash,
							studentResults: []
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
						prompt: question,
						dateHash: dateHash,
						studentResults: []
					}
				}
			});
		}
	},
	'sendResponse': function(surveyId, question, questionIndex, mcAnswer) {
		console.log(Meteor.userId());
		console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~1");
		var studentId = Student.findOne({userId: Meteor.userId()}).userId;
		console.log(studentId);
		console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~2");
		var studentAns = {studentId: studentId, answer: mcAnswer};
		var updatedQuestion = question;
		updatedQuestion.studentResults.push(studentAns);
		console.log(updatedQuestion.studentResults);
		console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~3");


		Surveys.update({_id: surveyId}, {
			$push: {
				questions: updatedQuestion
			}
		});

	}
});
}



// db.test.update({"heros.nickname":"test", "heros.spells.spell_id":1},
// {$set:{"heros.0.spells.1.level":3}});
