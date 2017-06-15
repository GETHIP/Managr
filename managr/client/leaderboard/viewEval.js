import { Student } from '../../collections/student.js';
import { Eval } from '../../collections/evals.js'

Template.viewEval.helpers({
	allEvals: function(){
    return Eval.find();
  },
	fullEval: function(){
		console.log(FlowRouter.getParam("id"));
		return Eval.find({_id: FlowRouter.getParam("id")});
	}
});
