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
            for(var i = 0; i < 3; i++)
            {
              stars = stars + eval(star_rating[i]); //converts string to number
              console.log(star_rating[i]);
              console.log(stars);
            }
            stars = stars / 3; // averaging the star ratings
            //var stars = (star_rating[0] + star_rating[1] + star_rating[2])/3
            console.log(stars);
          }
          var attendanceNumber = 0;
          console.log(element.name);
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
          if(star_rating){
            element.total = ((stars/5)*100 + (attendanceNumber/12)*100) / 2;
            element.stars = stars;
            console.log(element.total);
          }
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
