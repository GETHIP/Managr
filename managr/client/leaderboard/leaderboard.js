import { Student } from '../../collections/student.js';
import { Eval } from '../../collections/eval.js';
import { Instructor } from '../../collections/instructor.js';
import { Globals } from '../../collections/globals.js';

var _dep = new Deps.Dependency();


Template.leaderboard.onCreated(function(){
  Meteor.subscribe('Eval');
  Meteor.subscribe('Student');
  Meteor.subscribe('Instructor');
  Meteor.subscribe('Globals');

  Template.instance().sortDescriptor = new ReactiveVar("studentNameSort");
  Template.instance().sortAscending = new ReactiveVar(true);

  _dep.changed();
});

Template.leaderboard.helpers({

  students: function(){
    return Student.find({});
  },
  numberOfWeeks: function(){
		return Globals.numberOfWeeks();
	},
  stuarry: function(){
    var studentlist = Student.find({}).fetch();
    var evalList = Eval.find({}).fetch();
    var stuarry = [];
    var total;
    _dep.depend()
    studentlist.forEach(function (element) {
      var stars;
      var star_rating = Eval.find({evaluatee: element._id}).fetch();
      if(star_rating.length == 0){
        stars = 0
      }
      if(star_rating.length != 0){
        var effortTot = 0;
        var attTot = 0;
        var teamTot = 0;
        var techTot = 0;
        for (var i = 0; i < star_rating.length; i++){
          effortTot += eval(star_rating[i].stars[0]);
          attTot += eval(star_rating[i].stars[1]);
          teamTot += eval(star_rating[i].stars[2]);
          techTot += eval(star_rating[i].stars[3]);
        }
        var effort = effortTot/star_rating.length;
        var attitude = attTot/star_rating.length;
        var teamwork = teamTot/star_rating.length;
        var tech = techTot/star_rating.length;
        var week = star_rating.length;
        var stars = (effort + attitude + teamwork + tech)/4
         var attendanceNumber = 0;
      }else{
        var stars = 0;
        var effort = 0;
        var attitude = 0;
        var teamwork = 0;
        var tech =0;
        var week = 0;
        var attendanceNumber = 0;
      }

      element.attendance.forEach(function (ment){ //attendance number calculation
          if(ment == true){
            attendanceNumber++;
          }
      });
      element.attendanceNumber = attendanceNumber;
        element.average = Math.round(stars*10)/10; // rounds to the nearest tenths
        element.effort = Math.round(effort*10)/10;
        element.attitude = Math.round(attitude*10)/10;
        element.teamwork = Math.round(teamwork*10)/10;
        element.week = Math.round(week*10)/10;
        element.technical = Math.round(tech*10)/10;

      stuarry.push(element);
    });
  //  stuarry.sort();
    // var select = document.getElementById("sortingChoice");
    // try {
    //   var option = select.value;
    //   //console.log(option);
    //   if (option == "sortAlpha"){
    //     stuarry.sort(function(a, b){
    //       if (a.name < b.name) {return -1;}
    //       if (a.name > b.name) {return 1;}
    //       return 0;
    //     })}
    //   if (option == "sortAttendance"){
    //     stuarry.sort(function(a, b){ //sort function by attendanceNumber
    //       return b.attendanceNumber - a.attendanceNumber;
    //   })}
    //   if (option == "sortEffort"){
    //     stuarry.sort(function(a, b){ //sort function by attendanceNumber
    //       return b.effort - a.effort;
    //   })}
    //   if (option == "sortAttitude"){
    //     stuarry.sort(function(a, b){ //sort function by attendanceNumber
    //       return b.attitude - a.attitude;
    //   })}
    //   if (option == "sortTeamwork"){
    //     stuarry.sort(function(a, b){ //sort function by attendanceNumber
    //       return b.teamwork - a.teamwork;
    //   })}
    //   if (option == "sortTech"){
    //     stuarry.sort(function(a, b){ //sort function by attendanceNumber
    //       return b.technical - a.technical;
    //   })}
    //   if (option == "sortAverage"){
    //     stuarry.sort(function(a, b){ //sort function by attendanceNumber
    //       return b.average - a.average;
    //   })}
    // } catch (e) {
    //
    // }
    var sortDescriptor = Template.instance().sortDescriptor.get();
    var sortDirection = Template.instance().sortAscending.get() ? 1 : -1;
    stuarry.sort(function(student1, student2) {
        if (sortDescriptor == "studentNameSort") {
            return (student1.name.localeCompare(student2.name)) * sortDirection;
        } else if(sortDescriptor == "studentAttendanceSort") {
            return (student2.attendanceNumber - student1.attendanceNumber) * sortDirection;
        } else if(sortDescriptor == "studentWeekSort") {
            return (student2.week- student1.week) * sortDirection;
        } else if(sortDescriptor == "studentEffortSort") {
            return (student2.effort- student1.effort) * sortDirection;
        } else if(sortDescriptor == "studentAttitudeSort") {
            return (student2.attitude- student1.attitude) * sortDirection;
        } else if(sortDescriptor == "studentTeamworkSort") {
            return (student2.teamwork- student1.teamwork) * sortDirection;
        } else if(sortDescriptor == "studentTechSort") {
            return (student2.technical- student1.technical) * sortDirection;
        } else if(sortDescriptor == "studentAveSort") {
          return (student2.average- student1.average) * sortDirection;
        }
    });
    return stuarry;
  }
});

Template.leaderboard.events({
  'click .sortIcon': function(event) {
      var sortDescriptor = Template.instance().sortDescriptor.get();

      if(event.target.id == sortDescriptor) {
        Template.instance().sortAscending.set(!Template.instance().sortAscending.get());
      } else {
        Template.instance().sortDescriptor.set(event.target.id);
        Template.instance().sortAscending.set(true);
      }
  },
  'click .performanceBackbtn': function(event) {
    FlowRouter.go('/viewEval');
  }
});
