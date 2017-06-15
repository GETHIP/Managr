import { Student } from '../../collections/student.js';
import { Eval } from '../../collections/evals.js'


Template.viewEval.helpers({
	allEvals: function(){
    return Eval.find({evaluator: Instructor.find({userId: Meteor.user()._id})._id});
  },
	fullEval: function(){
		console.log(FlowRouter.getParam("id"));
		return Eval.find({_id: FlowRouter.getParam("id")});
	}
});

// Template.viewEval.events({
//   'click .viewEval': function(event){
//     event.preventDefault();
// 		eId = document.getElementById('eList').value;
// 	}
// });
