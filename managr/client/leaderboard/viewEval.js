import { Student } from '../../collections/student.js';
import { Eval } from '../../collections/evals.js'

var eId;

Template.viewEval.helpers({
	allEvals: function(){
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
