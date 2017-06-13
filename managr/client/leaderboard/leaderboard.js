import { Student } from "../../collections/student.js";

Template.leaderboard.onCreated(function() {
  Meteor.subscribe('Student');
});

Template.leaderboard.helpers({
	stuarry: function(){
    var studentlist = Student.find({}).fetch();
    var stuarry = new Array();
    console.log(studentlist);
    studentlist.forEach(function (element) {
          console.log(element.name);
          element.stars = 5; // temporary placeholder
          console.log(element.stars);
          element.attendanceNumber = 0;
          console.log(element.attendanceNumber);
          element.attendance.forEach(function (ment){ //attendance number calculation
              if(ment == true){
                    element.attendanceNumber++;
                  }
          });
          element.total = (element.stars/5)*100 + (element.attendanceNumber/12)*100;
          console.log(element.total);
          stuarry.push(element);
    });
		return stuarry;
	}
});
/*0
Template.leaderboard.events({
  'onclick #submitBtn' function(event){
    var rating = $('#rating').data('userrating');
    var this_student = Student.findOne({"_id"}).fetch();
    this_student.rating = rating;

  }
})
*/
