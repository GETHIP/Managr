import { Student } from '../../collections/student.js';
import { Eval } from '../../collections/evals.js'
import { Instructor } from '../../collections/instructor.js'

Template.leaderboard.onCreated(function() {
  Meteor.subscribe('Student');
});

Template.leaderboard.onCreated(function(){
  Meteor.subscribe('Eval');
    Meteor.subscribe('Student');
      Meteor.subscribe('Instructor');
});

Template.leaderboard.helpers({
	stuarry: function(){
    var studentlist = Student.find({}).fetch();
    var evalList = Eval.find({}).fetch();
    var stuarry = new Array();
    var stars = 5;
    var total;
    console.log(studentlist);

    evalList.forEach(function(comp){
      stuarry.push(comp.stars);
    })
    studentlist.forEach(function (element) {
          var attendanceNumber = 0;
          console.log(element.name);
          console.log(stars);
          element.attendance.forEach(function (ment){ //attendance number calculation
              if(ment == true){
                    attendanceNumber++;
                  }
          });
          //var sTotal = 0;
          //console.log(element.stars);
          //console.log(element.stars.length);
        //  for(var i = 0; i < element.stars.length; i++){
          //  sTotal = sTotal + element.stars[i];
          ///}
        // sTotal = sTotal / element.stars.length;
         //element.sTotal = sTotal;
          //console.log(element.sTotal);
          element.attendanceNumber = attendanceNumber;
          element.total = (stars/5)*100 + (attendanceNumber/12)*100;
          console.log(element.total);
          stuarry.push(element);
    });
    stuarry.sort(function(a, b){ //sort function
      return b.total - a.total;
    });
		return stuarry;
	},
  students: function(){
    console.log(Student.find().fetch());
    return Student.find({});
  }
});

Template.leaderboard.events({
  'click .submitbtn': function(event){
    event.preventDefault();
    console.log("its clicking");
    var rating = $('#rating').data('userrating');
    var attitude = $('#attitude').data('userrating')
    var teamwork = $('#teamwork').data('userrating')

    console.log(Instructor.findOne({userId: Meteor.user()._id}));

    comment = document.getElementById('textarea1').value;
    eaId = Instructor.find({userId: Meteor.user()._id})._id;
    eId = document.getElementById('group').value;
    week = document.getElementById('week').value.split(" ")[1];
    sList = [rating, attitude, teamwork ];
    console.log(eId);
    Meteor.call("sendEval", eaId, eId, comment, week, sList);

  }
})
