import { Student } from '../../collections/student.js';

Template.leaderboard.onCreated(function() {
  Meteor.subscribe('Student');
});

Template.leaderboard.helpers({
	stuarry: function(){
    var studentlist = Student.find({}).fetch();
    var stuarry = new Array();
    var attendanceNumber = 0;
    var stars = 5;
    var total;
    console.log(studentlist);
    studentlist.forEach(function (element) {
          console.log(element.name);
          console.log(stars);
          element.attendance.forEach(function (ment){ //attendance number calculation
              if(ment == true){
                    attendanceNumber++;
                  }
          });
          total = (stars/5)*100 + (attendanceNumber/12)*100;
          console.log(total);
          stuarry.push(element);
    });
		return stuarry;
	}
});

Template.leaderboard.events({
  'click .submitbtn': function(event){
    event.preventDefault();
    console.log("its clicking");
    var rating = $('#rating').data('userrating');
    //var this_student = Student.findOne({"_id"});
    //this_student.rating = rating;

    comment = document.getElementById('coSection').value;
    console.log(comment);
    eaId = Meteor.user()._id;
    eId = "testId";
    week = 5;
    sList = [];
    //eAid, eId, comment, current, sList
    Meteor.call("sendEval", eaId, eId, comment, week, sList);

  }
})
