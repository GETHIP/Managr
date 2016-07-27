import { Student } from '../../../collections/student.js';
import { Groups } from '../../../collections/groups.js';

Template.createGroup.onCreated(function() {
		Meteor.subscribe("Student");
    Meteor.subscribe("Groups");
});

Template.createGroup.events({
		"submit #createGroupForm"(event) {
        event.preventDefault();
        const form = event.target;

        var groupName = form.groupName.value;
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

        Meteor.call("createGroup", groupName, groupIds, studentIds);

        FlowRouter.go("/groups");
    }
});
Template.createGroup.helpers({
    groups: function() {
        var allGroups = Groups.find({}).fetch();
        var formattedGroups = [];
        for(var i = 0; i < allGroups.length; i++) {
            var group = allGroups[i];
            var formattedGroup = {
                name: group.name,
                groupId: group._id
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
});
