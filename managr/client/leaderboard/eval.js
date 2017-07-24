import { Student } from '../../collections/student.js';
import { Eval } from '../../collections/eval.js'
import { Instructor } from '../../collections/instructor.js'
import { Milestone } from '../../collections/milestone.js'

Template.eval.onCreated(function(){
  Meteor.subscribe('Eval');
    Meteor.subscribe('Student');
      Meteor.subscribe('Instructor');
      Meteor.subscribe('Milestone');
});

Template.registerHelper('equals', function (a, b) {
    return a === b;
  });

Template.eval.helpers({
	evalA: function(){
		data = Eval.findOne({_id: FlowRouter.getParam("id")});
		data.fSt = eval(data.stars[0]);
		data.sSt = eval(data.stars[1]);
		data.tSt = eval(data.stars[2]);
    data.fOSt = eval(data.stars[3]);
    var newDate = moment(data.timestamp);
		var formattedDate = moment(newDate).format("MMMM D [,] YYYY");
    data.formDate = formattedDate;
    data.to = Student.findOne({_id: data.evaluatee}).name;
    data.from = Instructor.findOne({_id: data.evaluator}).name;
    data.milestone = Milestone.findOne({_id: data.week}).name;
		return data;
  }
});

Template.eval.events({
  'click #confirmdeleteEval': function(event){
  Meteor.call("removeEval",FlowRouter.getParam("id"));
  FlowRouter.go("/viewEval")
    event.preventDefault();
  },
  'click .updateBtn': function(event){

  },
  'click .backStudentEval': function(event){
    FlowRouter.go("/viewEval");
    event.preventDefault();
  },
  'click .backEval': function(event){
    FlowRouter.go("/viewEval");
    event.preventDefault();
  },
  'click .editEval': function(event){
    FlowRouter.go("/editEval/" + FlowRouter.getParam("id"));
  },
  'click .deleteEval': function(event){
    Modal.show('deleteEvalModal');
  },

});
