import { Student } from "../../collections/student.js";

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
	}
});

Template.leaderboard.events({
  'onclick #submitBtn' function(event){
    var rating = $('#rating').data('userrating');
    var this_student = Student.findOne({"_id"}).fetch();
    this_student.rating = rating;

    comment = event.target.coSection;
    eAid = Meteor.user()._id;
    Meteor.call("sendEval", comment, week, eAid, eId, sList);

  }
})
