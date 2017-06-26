import { Student } from '../../collections/student.js';
import { Eval } from '../../collections/eval.js';
import { Instructor } from '../../collections/instructor.js';

Template.viewEval.onCreated(function(){
  Meteor.subscribe('Eval');
  Meteor.subscribe('Student');
  Meteor.subscribe('Instructor');
});



Template.viewEval.helpers({
	data: function(){
		console.log(Eval.find({}).fetch());
		data = Eval.find().fetch();
    for(var i = 0; i < data.length; i++){
		data[i].name = Student.findOne({_id: data[i].evaluatee}).name;
    data[i].instructor = Instructor.findOne({_id: data[i].evaluator}).name;
    console.log(data[i].stars);
		data[i].effort = data[i].stars[0];
		data[i].att = data[i].stars[1];
		data[i].team = data[i].stars[2];
		data[i].tech = data[i].stars[3];

  }
  console.log(data);
  return data;
},
	allEvals: function(){
    return Eval.find({evaluator: Instructor.find({userId: Meteor.user()._id})._id});
  },
	students: function(){
    //console.log(Student.find().fetch());
    return Student.find({});
	}
});

Template.viewEval.events({
	'click .submitbtn': function(event){
		event.preventDefault();
		var rating = $('#rating').data('userrating');
		var attitude = $('#attitude').data('userrating');
		var teamwork = $('#teamwork').data('userrating');
		var tech = $('#tech').data('userrating');

		comment = document.getElementById('textarea1').value;
		eaId = Instructor.findOne({userId: Meteor.user()._id})._id;
		console.log(eaId);
		eId = document.getElementById('group').value;
		week = document.getElementById('week').value.split(" ")[1];
		sList = [rating, attitude, teamwork, tech ];

		for(var i = 0; i < sList.length; i++){
			if(sList[i] == null){
				sList[i] = 1;
			}
		}

		console.log(sList);
		date = new Date();
		console.log(date);
		Meteor.call("sendEval", eaId, eId, comment, week, sList, date);

	},
  'click .rowClick': function(event){
    FlowRouter.go("/eval/" + event.target.id);

  }
});
