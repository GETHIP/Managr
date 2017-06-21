import { Eval } from '../../collections/eval.js'

Template.viewEval.onCreated(function(){
	console.log("it subbing");
  Meteor.subscribe('Eval');
});


Template.viewEval.helpers({
	data: function(){
		console.log(Eval.find({}).fetch());
    return Eval.find();
  }
});
