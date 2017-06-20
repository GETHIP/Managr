import { Student } from '../../collections/student.js';
import { Eval } from '../../collections/eval.js';
import { Instructor } from '../../collections/instructor.js';

var _dep = new Deps.Dependency();
var stuarry = []

Template.leaderboard.onCreated(function(){
  Meteor.subscribe('Eval');
  Meteor.subscribe('Student');
  Meteor.subscribe('Instructor');
});

Template.leaderboard.helpers({
  students: function(){
    console.log(Student.find().fetch());
    return Student.find({});
  },
  stuarry: function(){
    var studentlist = Student.find({}).fetch();
    var evalList = Eval.find({}).fetch();
    var stuarry = [];
    var total;
    console.log(studentlist)
    _dep.depend()
    studentlist.forEach(function (element) {
      var stars;
      console.log(element._id)
      var star_rating = Eval.find({evaluatee: element._id}).fetch();
      console.log(star_rating.stars)
      if(star_rating.length == 0){
        console.log('there are no star ratings')
        stars = 0
      }
      console.log(star_rating.length);
      if(star_rating.length != 0){
        stars = 0
        //star_rating = star_rating.fetch();
        star_rating = star_rating[0].stars;
        console.log(star_rating);
        var stars = (eval(star_rating[0]) + eval(star_rating[1]) + eval(star_rating[2]))/3
        console.log(stars);
        var effort = star_rating[0];
        var attitude = star_rating[1];
        var teamwork = star_rating[2];
        var attendanceNumber = 0;
      }else{
        var stars = 0;
        var attitude = 0;
        var teamwork = 0;
        var attendanceNumber = 0;
      }

      console.log(element.name);
      element.attendance.forEach(function (ment){ //attendance number calculation
          if(ment == true){
            attendanceNumber++;
          }
      });
      element.attendanceNumber = attendanceNumber;

        element.average = stars;
        element.effort = effort;
        element.attitude = attitude;
        element.teamwork = teamwork;
        console.log(element.effort);
        console.log(element.average);
        console.log(element.attitude)
        console.log(element.teamwork)

      stuarry.push(element);
      console.log("ushing to stuarray")
      console.log(stuarry)
    });
    stuarry.sort();
    var select = document.getElementById("sortingChoice");
    var option = select.value;
    if (option == "sortAttendance"){
      stuarry.sort(function(a, b){ //sort function by attendanceNumber
        return b.attendanceNumber - a.attendanceNumber;
    })}
    if (option == "sortEffort"){
      stuarry.sort(function(a, b){ //sort function by attendanceNumber
        return b.effort - a.effort;
    })}
    if (option == "sortAttitude"){
      stuarry.sort(function(a, b){ //sort function by attendanceNumber
        return b.attitude - a.attitude;
    })}
    if (option == "sortTeamwork"){
      stuarry.sort(function(a, b){ //sort function by attendanceNumber
        return b.teamwork - a.teamwork;
    })}
    if (option == "sortAverage"){
      stuarry.sort(function(a, b){ //sort function by attendanceNumber
        return b.average - a.average;
    })}
    return stuarry;
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

  },
  'change #sortingChoice': function(event) {
    _dep.changed();
  }
});

function sortType(){

}
