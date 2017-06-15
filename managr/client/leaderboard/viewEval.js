import { Student } from '../../collections/student.js';
import { Eval } from '../../collections/eval.js'

var eId;

Template.viewEval.helpers({
<<<<<<< HEAD
	eval: function(){
=======
	allEvals: function(){
>>>>>>> b17d6ef738692b192ff9262eabcaeaedcba76b1c
    var data = Eval.find({evaluator: Meteor.user()._id});
  	return data;
  },
	fullEval: function(){
		return Eval.find({_id: eId});
	}
});

// Template.viewEval.events({
//   'click .submitbtn': function(event){
//     event.preventDefault();
// 		event.target.
//
// 	}
// });
