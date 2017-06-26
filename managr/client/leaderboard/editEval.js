import { Student } from '../../collections/student.js';
import { Eval } from '../../collections/eval.js'
import { Instructor } from '../../collections/instructor.js'

Template.editEval.onCreated(function(){
  Meteor.subscribe('Eval');
    Meteor.subscribe('Student');
      Meteor.subscribe('Instructor');
});

Template.registerHelper('equals', function (a, b) {
    return a === b;
  });

Template.editEval.helpers({
  eval: function(){
    data = Eval.findOne({_id: FlowRouter.getParam("id")});
    data.fSt = eval(data.stars[0]);
    data.sSt = eval(data.stars[1]);
    data.tSt = eval(data.stars[2]);
    data.fOSt = eval(data.stars[3]);
    data.to = Student.findOne({_id: data.evaluatee}).name;
    data.from = Instructor.findOne({_id: data.evaluator}).name;
    var newDate = moment(data.timestamp);
    var formattedDate = moment(newDate).format("MMMM D [,] YYYY");
    data.formDate = formattedDate;
    return data;
  }
});

//id, message, star1, star2, star3, star4, milestone,
Template.editEval.events({
  'click .saveEval': function(){
      var message  = document.getElementById('message').value;
      var starBox1 = document.getElementById('starBox1').value;
      var starBox2 = document.getElementById('starBox2').value;
      var starBox3 = document.getElementById('starBox3').value;
      var starBox4 = document.getElementById('starBox4').value;
      var week;
      Meteor.call("editEval", message, starBox1, starBox2, starBox3, starBox4, week);

  }
});
