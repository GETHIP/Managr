import { Instructor } from '../../collections/instructor.js';
import { Student } from '../../collections/student.js';
import { Assignments } from '../../collections/assignments.js';
import { Groups } from '../../collections/groups.js';

Template.newAssignment.onCreated(function() {
    Meteor.subscribe('Assignments');
    Meteor.subscribe('Instructor');
    Meteor.subscribe('Student');
    Meteor.subscribe('Groups');
});

Template.newAssignment.helpers({
    assignments: function() {
        var formattedAssignments = [];
        var assignments = Assignments.find({}).fetch();

        for (var i = 0; i < objects.length; i++) {
            var assignment, formattedAssignment;
            assignment = assignments[i];
            // The formatted object to be returned
            formattedAssignment = {
                title: assignment.title,
                description: assignment.description,
                dueDate: assignment.dueDate.getMonth() + "/" + assignment.dueDate.getDate() + "/" + assignment.dueDate.getFullYear(),
                assigner: assignment.assigner,
                dateAssigned: assignment.dateAssigned.getMonth() + "/" + assignment.dateAssigned.getDate() + "/" + assignment.dateAssigned.getFullYear(),
                pointsPossible: assignment.pointsPossible
            }
            formattedAssignments.push(formattedAssignment);
        }
        return formattedAssignments;
    },
    groups: function() {
        var allGroups = Groups.find({}).fetch();
        var formattedGroups = [];
        for (var i = 0; i < allGroups.length; i++) {
            var formattedGroup = {
                name: allGroups[i].name,
                id: allGroups[i]._id
            }
            formattedGroups.push(formattedGroup);
        }
        return formattedGroups;
    },
    students: function() {
        var allStudents = Student.find({}).fetch();
        var formattedStudents = [];
        for (var i = 0; i < allStudents.length; i++) {
            var student = allStudents[i];
            var formattedStudent = {
                name: student.name,
                id: student._id
            }
            formattedStudents.push(formattedStudent);
        }
        return formattedStudents;
    }
});

Template.newAssignment.events({
    'submit .submitbtn' (event) {
        event.preventDefault();
        const form = event.target;

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

        Meteor.call("createAssignment", title, description, dueDate, pointsPossible, groupIds, studentIds);

        FlowRouter.go("/assignments");
    }
});
