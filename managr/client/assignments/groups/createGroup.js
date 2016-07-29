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

        Meteor.call("createGroup", groupName, studentIds);

        FlowRouter.go("/groups");
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
