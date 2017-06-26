import { Student } from '../../collections/student.js';
import { Eval } from '../../collections/eval.js'
import { Instructor } from '../../collections/instructor.js'

Template.eval.onCreated(function(){
  Meteor.subscribe('Eval');
    Meteor.subscribe('Student');
      Meteor.subscribe('Instructor');
});

Template.registerHelper('equals', function (a, b) {
    return a === b;
  });

Template.eval.helpers({
	evalA: function(){
		data = Eval.findOne({_id: FlowRouter.getParam("id")});
		console.log(data);
		data.fSt = eval(data.stars[0]);
		data.sSt = eval(data.stars[1]);
		data.tSt = eval(data.stars[2]);
		console.log(data.tSt);
    var newDate = moment(data.timestamp);
		var formattedDate = moment(newDate).format("MMMM D [,] YYYY");
    data.formDate = formattedDate;
    data.to = Student.findOne({_id: data.evaluatee}).name;
    data.from = Instructor.findOne({_id: data.evaluator}).name;
    console.log(data.from);
    console.log(data.formDate);
		return data;
  }
});

Template.eval.events({
  'click .deleteEval': function(event){
    console.log(3423423)
  Meteor.call("removeEval",FlowRouter.getParam("id"));
  FlowRouter.go("/viewEval")
    event.preventDefault();
  },
  'click .updateBtn': function(event){

  },
  'click .backEval': function(event){
    FlowRouter.go("/viewEval");
    event.preventDefault();
  }
});
