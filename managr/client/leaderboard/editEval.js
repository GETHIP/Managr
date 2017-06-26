import { Student } from '../../collections/student.js';
import { Eval } from '../../collections/eval.js'
import { Instructor } from '../../collections/instructor.js'

Template.editEval.onCreated(function(){
  Meteor.subscribe('Eval');
    Meteor.subscribe('Student');
      Meteor.subscribe('Instructor');
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
    return data;
  }
});


Tempate.editEval.events({
  'click .editBtn': function(){



  }
});
