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
	    dueDate: moment(assignment.dueDate).format("MM/DD/YYYY"),
      assigner: assignment.assigner,
      dateAssigned: moment(assignment.dateAssigned).format("MM/DD/YYYY"),
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
        var dueDate = moment(form.dateDue.value, "YYYY-MM-DD").toDate();
    var pointsPossible = form.points.value;

    var inputs = document.getElementsByTagName("INPUT");

    var studentIds = [];
    for(var i = 0; i < inputs.length; i++) {
        if(inputs[i].type == "checkbox" && inputs[i].checked) {
            //Because if it is a valid group, then that implies it is not a student, so we don't want this in our studentIds array
            var group = Groups.findOne({_id: inputs[i].id});
            if(group != undefined) {
                continue;
            }
            studentIds.push(inputs[i].id);
        }
    }

    Meteor.call("updateAssignment", assignmentId, title, description, dueDate, pointsPossible, studentIds, originallyChckedIds);

    //This is necessary since the pages don't actually refresh, we must simulate a refrsh by setting this variable
    //back to a blank array, otherwise the data in it would persist between assignment modifications and sessions
    originallyChckedIds = [];

    FlowRouter.go("/assignments");
  },
  'change .groupCheckBox':function(event) {
      var groupId = event.target.id;
      var group = Groups.findOne({_id: groupId});
      var inputs = document.getElementsByTagName("INPUT");

      //If its checked, they just clicked it, so we want to add the students. If its not checked, they unclicked it,
      //so we want to remove the students
      if(event.target.checked) {
          for(var i = 0; i < group.studentIds.length; i++) {
              var studentId = group.studentIds[i];
              var checkbox = document.getElementById(studentId);
              if(checkbox != undefined) {
                  checkbox.checked = true;
              }
          }
      } else {
          var selectedGroups = [];
          for(var i = 0; i < inputs.length; i++) {
              if(inputs[i].type == "checkbox" && inputs[i].checked) {
                  var selectedGroup = Groups.findOne({_id: inputs[i].id});
                  //Because the inputs array has its elements in the order defined in the DOM, we know that groups
                  //come before the students in DOM. Therefore, once selectedGroup is equal to undefined, we know
                  //that we have reached students, therefore enabling us to optimize this method by breaking
                  //and not iterating through all the students
                  if(selectedGroup == undefined) {
                      break;
                  }
                  selectedGroups.push(selectedGroup);
              }
          }

          for(var i = 0; i < group.studentIds.length; i++) {
              var studentId = group.studentIds[i];
              var checkbox = document.getElementById(studentId);

              if(checkbox != undefined) {
                  var found = false;
                  for(var j = 0; j < selectedGroups.length; j++) {
                      //Dont want to include the clicked group in this comparison
                      if(selectedGroups[j].id != groupId) {
                          if(selectedGroups[j].studentIds.indexOf(studentId) != -1) {
                              found = true;
                              break;
                          }
                      }
                  }
                  if(!found) {
                      checkbox.checked = false;
                  }
              }
          }
      }
  }
});
