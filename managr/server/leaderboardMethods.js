import { Meteor } from 'meteor/meteor';
import { Posts } from '../collections/blogPosts.js';
import { Comments } from '../collections/comments.js';
import { Assignments } from '../collections/assignments.js';
import { Instructor } from '../collections/instructor.js';
import { Student } from '../collections/student.js';
import { Drafts } from '../collections/drafts.js';
import { Eval } from '../collections/evals.js';
import { isStudent, isInstructor, userIsValid, currentUserOrInstructor, nameOfUser } from '../lib/permissions.js';

export function leaderboardMethods() {
	Meteor.methods({
		'sendEval' : function(eAid, eId, comment, current, sList) {
			//Impmenent Security with roles
			Eval.insert({evaluator: eAid, evaluatee: eId, message: comment, week: current, stars: sList});
		},
    'removeEval' : function(id){
        //Remove Eval
    },
    'editEval' : function(id){
        //Edit Eval
    }
	});
}
