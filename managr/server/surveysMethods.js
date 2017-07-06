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
			//Uncomment after assigning students

			// console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~1");
			// console.log("Remove Surveys works!");
			// var allStudents = Student.find({}).fetch();
			// console.log(allStudents);
			// console.log(allStudents.length);
			// console.log()
			// console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~2");
			// for(var j = 0; j < allStudents.length; j+) {
			// 	var studentSurveys = allStudents[j].surveys;
			// 	for(var i = 0; i < studentSurveys.length; i++) {
			// 		if(studentSurveys[i].surveyId == surveyId) {
			// 			studentSurveys.splice(i, 1);
			// 			Student.update({_id: allStudents[j]._id}, {
			// 				$set: {surveys: studentSurveys}
			// 			});
			// 			break;
			// 		}
			// 	}
			// }
			// console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~3");
			Surveys.remove(surveyId);
		},
		//Surveys.update({_id: surveyId}, { $pull: { [questions]: { "dateHash": dateHash } } });

		// 'deleteComment': function(id, index) {
		// 	var comments = Posts.findOne({"_id": id}).comments;
		// 	var correctId = comments[index].authorId;
		// 	if(currentUserOrInstructor(correctId)) {
		// 		comments.splice(index, 1);
		// 		Posts.update({"_id": id}, {$set : {comments : comments}});
		// 	}
		// },a
		'incCompletedSurveyCt': function(surveyId){
			Surveys.update({_id:surveyId}, {
				$inc: { studentsCompleted: 1 }
			});
		},
		'createNewSurvey': function(surveyName, date, anonToggle) {
			if(!isInstructor()) {
				return;
			}
			return Surveys.insert({
				name: surveyName,
				studentsCompleted: 0,
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
	'sendResponse': function(surveyId, question, questionHash, mcAnswer, index) {
		console.log(Meteor.userId());
		console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
		var studentId = Student.findOne({userId: Meteor.userId()}).userId;
		var totalSurveys = Surveys.findOne({_id: surveyId});
		var totalQuestions = totalSurveys.questions;
		var newStudentResults;
		var newAnswer = {};

		for(var j = 0; j < totalQuestions.length; j++) {
			var totalOptions = totalQuestions[j].options;
			console.log(totalOptions);

			if(totalQuestions[j].dateHash == questionHash) {

				//for(var i = 0; i < totalOptions.length; i++) {
					newAnswer.studentId = studentId;
					newAnswer.answer = mcAnswer;
					Surveys.update({_id: surveyId, "questions.dateHash": questionHash},
					{
						$push: {
							"questions.$.studentResults": newAnswer
						}
						//questions: newQuestions;
					});
					break;
				//}
			}
		}

 	// 	Surveys.update({_id: surveyId}, {
 	// 		$push: {
 	// 			questions: updatedQuestion
 	// 		}
 	// 	});
	}
});
}
