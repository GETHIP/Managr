import { Student } from '../../collections/student.js';
import { Eval } from '../../collections/evals.js'

Template.leaderboard.onCreated(function() {
  Meteor.subscribe('Student');
});

Template.leaderboard.onCreated(function(){
  Meteor.subscribe('Eval');
});

Template.leaderboard.helpers({
	stuarry: function(){
    var studentlist = Student.find({}).fetch();
    var evalList = Eval.find({}).fetch();
    var stuarry = new Array();

    var stars = 5;
    var total;
    console.log(studentlist);

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



    comment = document.getElementById('coSection').value;
    eaId = Meteor.user()._id;
    eId = document.getElementById('group').value;
    week = document.getElementById('week').value.split(" ")[1];
    sList = [rating, attitude, teamwork ];
    console.log(eId);
    Meteor.call("sendEval", eaId, eId, comment, week, sList);

  }
})
