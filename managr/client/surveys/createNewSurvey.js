//create event.js
import { Surveys } from '../../collections/surveys.js';
import { Student } from '../../collections/student.js';

Template.questionFormTemplate.onCreated(function() {
    Meteor.subscribe("Student");
    Meteor.subscribe("Surveys");
});

Template.questionFormTemplate.events({
  "submit #createSurveyBtn"(event) {//createSurveyBtn//questionFormSbmt
    event.preventDefault();
    var target = event.target;

    var surveyName = target.name.value;
    var date = target.dueDate.value;
    var question = target.prompt.value;


    console.log(surveyName);
    console.log(date);
    console.log(question);


    Meteor.call("createNewEvent", surveyName, date, question);

  }
});

import { Groups } from '../../collections/groups.js';

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
