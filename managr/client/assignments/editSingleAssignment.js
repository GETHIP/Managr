import { Instructor } from '../../collections/instructor.js';
import { Assignments } from '../../collections/assignments.js';
import { Groups } from '../../collections/groups.js';
import { Student } from '../../collections/student.js';

Template.editSingleAssignment.onCreated(function() {
  Meteor.subscribe('Assignments');
  Meteor.subscribe('Instructor');
  Meteor.subscribe('Groups');
  Meteor.subscribe('Student');
});

var getCurrentAssignment = function() {
    return Assignments.findOne({_id: FlowRouter.getParam("id")});
}

var originallyChckedIds = [];

Template.editSingleAssignment.helpers({
  assignments: function() {
    var assignment = getCurrentAssignment();

    function numPad(n) {
      if (n.toString().length == 1) {
        return "0" + n.toString();
      } else {
        return n.toString();
      }
    }

    var formattedAssignment = {
      title: assignment.title,
      description: assignment.description,
      dueDate: (assignment.dueDate.getFullYear()) + "-" + numPad(assignment.dueDate.getMonth()) + "-" +  numPad(assignment.dueDate.getDate()),
      assigner: assignment.assigner,
      dateAssigned: assignment.dueDate.getFullYear() + "-" + numPad(assignment.dueDate.getMonth()) + "-" +  numPad(assignment.dueDate.getDate()),
      pointsPossible: assignment.pointsPossible
    }
    return formattedAssignment;
  },
  groups: function() {
      var allGroups = Groups.find({}).fetch();
      var formattedGroups = [];
      for(var i = 0; i < allGroups.length; i++) {
          var formattedGroup = {
              name: allGroups[i].name,
              id: allGroups[i]._id,
              checked: allStudentsInGroupHaveAssignment(getCurrentAssignment(), allGroups[i])
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
          var checked = studentHasAssignment(getCurrentAssignment(), student);
          if(checked) {
            originallyChckedIds.push(student._id);
          }
          var formattedStudent = {
              name: student.name,
              id: student._id,
              checked: checked
          }
          formattedStudents.push(formattedStudent);
      }
      return formattedStudents;
  }
});

var allStudentsInGroupHaveAssignment = function(assignment, group) {
    var studentIds = group.studentIds;
    for(var i = 0; i < studentIds.length; i++) {
        var student = Student.findOne({_id: studentIds[i]});
        if(student == undefined) {
            continue;
        }

        var studentAssignments = student.assignments;
        var found = false;
        for(var j = 0; j < studentAssignments; j++) {
            if(studentAssignments[j].assignmentId == assignment._id) {
                found = true;
                break;
            }
        }

        if(!found) {
            return false;
        }

    }
    return true;
}

var studentHasAssignment = function(assignment, student) {
    var studentAssignments = student.assignments;
    for(var i = 0; i < studentAssignments.length; i++) {
        if(studentAssignments[i].assignmentId == assignment._id) {
            return true;
        }
    }
    return false;
}

Template.editSingleAssignment.events({
  'submit .submitbtn'(event) {
    event.preventDefault();
    const form = event.target;

    var assignmentId = FlowRouter.getParam("id");
    var title = form.name.value;
    var description = document.getElementById("editor").innerHTML;
    var dueDate = new Date(form.dateDue.value);
    dueDate.setMonth(dueDate.getMonth() + 1);
    dueDate.setDate(dueDate.getDate() + 1);
    var pointsPossible = form.points.value;

    var inputs = document.getElementsByTagName("INPUT");

    var groupIds = [];
    var studentIds = [];
    for(var i = 0; i < inputs.length; i++) {
        if(inputs[i].type == "checkbox" && inputs[i].checked) {
            if(inputs[i].id.substring(0, 7) == "student") {
                studentIds.push(inputs[i].id.substring(7));
            } else {
                groupIds.push(inputs[i].id.substring(5));
            }
        }
    }

    Meteor.call("updateAssignment", assignmentId, title, description, dueDate, pointsPossible, groupIds, studentIds, originallyChckedIds);

    //This is necessary since the pages don't actually refresh, we must simulate a refrsh by setting this variable
    //back to a blank array, otherwise the data in it would persist between assignment modifications and sessions
    originallyChckedIds = [];

    FlowRouter.go("/assignments");
  }
});
