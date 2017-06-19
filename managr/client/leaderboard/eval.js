import { Student } from '../../collections/student.js';
import { Eval } from '../../collections/eval.js'
import { Instructor } from '../../collections/instructor.js'

Template.eval.onCreated(function(){
  Meteor.subscribe('Eval');
    Meteor.subscribe('Student');
      Meteor.subscribe('Instructor');
});

Template.eval.helpers({
	eval: function(){
		data = Eval.findOne({_id: FlowRouter.getParam("id")});
		console.log(data);
		data.fSt = eval(data.stars[0]);
		data.sSt = eval(data.stars[1]);
		data.tSt = eval(data.stars[2]);
		console.log(data.tSt);
		return data;
  }
});

Template.leaderboard.events({
  'click .delBtn': function(event){
    event.preventDefault();
  },
  'click .updateBtn': function(event){

  }
});
