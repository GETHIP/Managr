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
  }
});
