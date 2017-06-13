import { Student } from "../../collections/student.js";

Template.leaderTable.onCreated(function() {
  Meteor.subscribe('Students');
});

Template.leaderTable.helpers({
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
