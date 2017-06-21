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
    console.log(data.formDate);
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
