import { Student } from '../../collections/student.js';
import { Eval } from '../../collections/evals.js'

Template.viewEval.helpers({
	evals: function(){
    var data = Eval.find({evaluator: Meteor.user()._id});
  return list;


  }
});
