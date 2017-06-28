import { Student } from '../../collections/student.js';
import { Eval } from '../../collections/eval.js';
import { Instructor } from '../../collections/instructor.js';

var _dep = new Deps.Dependency();

Template.viewEval.onCreated(function(){
  Meteor.subscribe('Eval');
  Meteor.subscribe('Student');
  Meteor.subscribe('Instructor');
  _dep.changed();
});

Template.viewEval.helpers({
	data: function(){
    _dep.depend()

    console.log("hi")
    var selectStudent = document.getElementById("studentChoice");
    var selectInstruct = document.getElementById("instructorChoice");

   try{
    selectStudent = selectStudent.value;
    selectInstruct = selectInstruct.value;

    if(selectStudent == "sortAll" && selectInstruct == "sortAll"){
    		//console.log(Eval.find({}).fetch());
    		var data = Eval.find().fetch();
        for(var i = 0; i < data.length; i++){
        //  console.log(Student.findOne({_id: data[i].evaluatee}));
    		data[i].name = Student.findOne({_id: data[i].evaluatee}).name;
        data[i].instructor = Instructor.findOne({_id: data[i].evaluator}).name;
        //console.log(data[i].name);
      //  console.log(data[i].instructor);
      //  console.log(data[i].stars);
    		data[i].effort = data[i].stars[0];
    		data[i].att = data[i].stars[1];
    		data[i].team = data[i].stars[2];
    		data[i].tech = data[i].stars[3];
      }
    }

    if(selectStudent != "sortAll" && selectInstruct == "sortAll"){
      var data = [];
      var dataList = Eval.find({evaluatee: document.getElementById("studentChoice").value}).fetch();
      console.log(dataList)
      dataList.forEach(function(element){
        element.name = $("#studentChoice option:selected").text();
        element.instructor = Instructor.findOne({_id: element.evaluator}).name;
        element.effort = element.stars[0];
        element.att = element.stars[1];
        element.team = element.stars[2];
        element.tech = element.stars[3];
        data.push(element);
      });
    }
      if(selectStudent == "sortAll" && selectInstruct != "sortAll"){
        var data = [];
        var dataList = Eval.find({evaluator: document.getElementById("instructorChoice").value}).fetch();
        console.log(dataList)
        dataList.forEach(function(element){
          element.name = Student.findOne({_id: element.evaluatee}).name;
          console.log(element.name)
          element.instructor = $("#instructorChoice option:selected").text();
          element.effort = element.stars[0];
          element.att = element.stars[1];
          element.team = element.stars[2];
          element.tech = element.stars[3];
          data.push(element);
        });
      }
        if(selectStudent != "sortAll" && selectInstruct != "sortAll"){
          var data = [];
          var dataList = Eval.find({
            evaluator: document.getElementById("instructorChoice").value,
            evaluatee: document.getElementById("studentChoice").value
          }).fetch();
          console.log(dataList)
          dataList.forEach(function(element){
            element.name = Student.findOne({_id: element.evaluatee}).name;
            element.instructor = Instructor.findOne({_id: element.evaluator}).name;;
            element.effort = element.stars[0];
            element.att = element.stars[1];
            element.team = element.stars[2];
            element.tech = element.stars[3];
            data.push(element);
          });
        }
      } catch (e) {
        console.log("error, the try statement not working")
      }
          return data;

  //console.log(data);

},
	allEvals: function(){
    return Eval.find({evaluator: Instructor.find({userId: Meteor.user()._id})._id});
  },
	students: function(){
    return Student.find();
	},
  instructors: function(){
    return Instructor.find();
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
		listVal = document.getElementById('dataListInput').value;
    eId = $('#group [value="' + listVal + '"]').data('value');
    console.log($('#group [value="' + listVal + '"]'));
    console.log(eId)
		week = document.getElementById('week').value.split(" ")[1];
		sList = [rating, attitude, teamwork, tech ];

		for(var i = 0; i < sList.length; i++){
			if(sList[i] == null){
				sList[i] = 1;
			}
		}

		date = new Date();
		Meteor.call("sendEval", eaId, eId, comment, week, sList, date);

	},
  'click .rowClick': function(event){
    FlowRouter.go("/eval/" + event.target.id);

  },
  'change #studentChoice': function(event){
    event.preventDefault();
    _dep.changed();
  },
  'change #instructorChoice': function(event){
    event.preventDefault();
    _dep.changed();
  }
});
