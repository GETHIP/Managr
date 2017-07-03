import { Meteor } from 'meteor/meteor';
import { Posts } from '../collections/blogPosts.js';
import { Comments } from '../collections/comments.js';
import { Assignments } from '../collections/assignments.js';
import { Instructor } from '../collections/instructor.js';
import { Student } from '../collections/student.js';
import { Drafts } from '../collections/drafts.js';
import { Eval } from '../collections/eval.js';
import { Milestone } from '../collections/milestone.js'
import { isStudent, isInstructor, userIsValid, currentUserOrInstructor, nameOfUser } from '../lib/permissions.js';

export function leaderboardMethods() {
	Meteor.methods({
		'sendEval' : function(eAid, eId, comment, current, sList, cDate) {
			if(Roles.userIsInRole(this.userId, "instructor")){
			Eval.insert({evaluator: eAid, evaluatee: eId, message: comment, week: current, stars: sList, timeStamp: cDate});
		}
		},
    'removeEval' : function(id){
			if(Roles.userIsInRole(this.userId, "instructor")){
				Eval.remove({"_id": id});
			}
    },
    'editEval' : function(id, message, star1, star2, star3, star4, milestone, ){
			if(Roles.userIsInRole(this.userId, "instructor")){
			var stars = [star1, star2, star3, star4];
			console.log(stars);
			Eval.update({"_id": id}, {$set: {message: message, stars: stars, week: milestone}});
			}
		},
		'newMilestone' : function(name){
			if(Roles.userIsInRole(this.userId, "instructor")){
			console.log(name);
			Milestone.insert({name: name});
		}
		},
		'removeMilestone' : function(id){
			if(Roles.userIsInRole(this.userId, "instructor")){
			console.log("it going");
			Milestone.remove({"_id": id});
			}
		}
	});
}
