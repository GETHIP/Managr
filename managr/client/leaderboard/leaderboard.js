import { Student } from "../../collections/student.js";
import { Eval } from '../../collections/evals.js';

Template.leaderboard.onCreated(function() {
  Meteor.subscribe('Students');
});

Template.leaderboard.helpers({
	stuarry: function(){
    var studentlist = Student.find({}).fetch();
    var stuarry = new Array();
    console.log(studentlist);
    studentlist.forEach(function (element) {
          console.log(element).fetch();
          element.attendanceNumber = 0;
          element.stars = 5; // temporary placeholder

          element.attendance.forEach(function (ment){ //attendance number calculation
              if(ment == true){
                    element.attendanceNumber++;
                  }
          });
          element.total = (element.stars/5)*100 + (element.attendanceNumber/12)*100;
          console.log(element.total.fetch());
          stuarry.push(element);
    });
		return stuarry;
	},

  

});


// Template.EvalsPage.events({
// 	'click .submit':function(event) {
//     var eAid = Meteor.user()._id;
//     var eId;
//     var comment;
//     Meteor.call("sendEval", eAid, eId, comment);
//
// }});
