import { Student } from '../../collections/student.js';
import { Eval } from '../../collections/eval.js'
import { Instructor } from '../../collections/instructor.js'

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
    var total;

    studentlist.forEach(function (element) {
          var stars;
          console.log(element._id)
          var star_rating = Eval.find({evaluatee: element._id});
          if(!star_rating){
            stars = 0
          }
          if(star_rating){
            stars = 0
            star_rating = star_rating.fetch();
            star_rating = star_rating[0].stars;
            console.log(star_rating);
            var stars = (star_rating[0] + star_rating[1] + star_rating[2])/3
            console.log(stars);
          }
          var effort = star_rating[0];
          var attitude = star_rating[1];
          var teamwork = star_rating[2];
          var attendanceNumber = 0;
          console.log(element.name);
          element.attendance.forEach(function (ment){ //attendance number calculation
              if(ment == true){
                    attendanceNumber++;
                  }
          });
          element.attendanceNumber = attendanceNumber;
          if(star_rating){
            element.average = stars;
            element.attitude = attitude;
            element.teamwork = teamwork;
            console.log(element.average);
            console.log(element.attitude)
            console.log(element.teamwork)
          }
          stuarry.push(element);
    });
    stuarry.sort(function(a, b){ //sort function
      return b.attendanceNumber - a.attendanceNumber;
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
    var rating = $('#rating').data('userrating');
    var attitude = $('#attitude').data('userrating');
    var teamwork = $('#teamwork').data('userrating');

    comment = document.getElementById('textarea1').value;
    eaId = Instructor.findOne({userId: Meteor.user()._id})._id;
    console.log(eaId);
    eId = document.getElementById('group').value;
    week = document.getElementById('week').value.split(" ")[1];
    sList = [rating, attitude, teamwork ];

    for(var i = 0; i < sList.length; i++){
      if(sList[i] == null){
        sList[i] = 1;
      }
    }

    console.log(sList);
    Meteor.call("sendEval", eaId, eId, comment, week, sList);

  }
});
