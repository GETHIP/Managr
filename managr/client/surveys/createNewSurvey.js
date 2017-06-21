//create event.js
import { Surveys } from '../../collections/surveys.js';
import { Student } from '../../collections/student.js';
import { Groups } from '../../collections/groups.js';

  console.log(234342);

  var name = "";
  var sDate = "";

Template.newSurvey.onCreated(function() {
    Meteor.subscribe("Student");
    Meteor.subscribe("Surveys");
    Meteor.subscribe("Questions");
});

Template.newSurvey.events({
  'click #createSurveyBtn' (event) {//createSurveyBtn//questionFormSbmt
    event.preventDefault();
    console.log(79879);
    const form = event.target;

    var surveyName = document.getElementById('surveyName').value
    var date = moment(document.getElementById('dueDate').value, "YYYY-MM-DD").toDate();
//    var question = target.prompt.value;


    console.log(surveyName);
    console.log(date);

    name = surveyName;
    sDate = date;

    Meteor.call("createNewSurvey", surveyName, date);

  }
});


Template.newSurvey.helpers({
  'data': function(){
      return {sName: name, date: sDate};
  }
});



/*Template.createEvent.helpers({
    groups: function() {
        var allGroups = Groups.find({}).fetch();
        var formattedGroups = [];
        for(var i = 0; i < allGroups.length; i++) {
            var group = allGroups[i];
            var formattedGroup = {
                name: group.name,
                groupId: group._id,
								size: group.size,
								leader: group.leader
            }
            formattedGroups.push(formattedGroup);
        }
        return formattedGroups;
    },
    students: function() {
        var allStudents = Student.find({}).fetch();
        var formattedStudents = [];
        for(var i = 0; i < allStudents.length; i++) {
            var student = allStudents[i];
            var formattedStudent = {
                name: student.name,
                studentId: student._id
            }
            formattedStudents.push(formattedStudent);
        }
        return formattedStudents;
    }
});*/

var newformatStudentsForGroup = function(studentIds) {
    var formattedStudents = [];

    for(var i = 0; i < studentIds.length; i++) {
        var student = Student.findOne({_id: studentIds[i]});
        if(student == undefined) {
            continue;
        }
        name = student.name;
        formattedStudents.push(name);
    }
    return formattedStudents;
}
