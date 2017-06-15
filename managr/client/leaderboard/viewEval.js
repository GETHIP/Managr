import { Student } from '../../collections/student.js';
import { Eval } from '../../collections/eval.js'

Template.viewEval.helpers({
	eval: function(){
    var data = Eval.find({evaluator: Meteor.user()._id});
  return list;


  }
});
