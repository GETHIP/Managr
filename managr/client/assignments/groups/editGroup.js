import { Student } from '../../../collections/student.js';
import { Groups } from '../../../collections/groups.js';

Template.editGroup.onCreated(function() {
		Meteor.subscribe("Student");
    Meteor.subscribe("Groups", function() {
        var groupId = FlowRouter.getParam("id");
        var group = Groups.findOne({_id: groupId});
        if(group == undefined) {
            FlowRouter.go("/groups");
        }
    });
});

Template.editGroup.events({
		"submit #editGroupForm"(event) {
        event.preventDefault();
        const form = event.target;

        var groupId = FlowRouter.getParam("id");
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

        Meteor.call('updateGroup', groupId, groupName, studentIds);

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

var getGroupBeingEdited = function() {
    var groupId = FlowRouter.getParam("id");
    var group = Groups.findOne({_id: groupId});
    return group;
}

//Compares the two groups to see if they are equal, it is defined as equal if they have the same name
//and they have all the same students, and no dissenting students
var groupsEqual = function(group1, group2) {
		if(group1.name != group2.name) {
				return false;
		}
		//This is potentially a faster check because most groups won't have the same number of students
		//so we can immediately throw some out if their lengths aren't equal
		if(group1.studentIds.length != group2.studentIds.length) {
				return false;
		}
		for(var i = 0; i < group1.studentIds.length; i++) {
				if(group2.studentIds.indexOf(group1.studentIds[i]) == -1) {
						return false;
				}
		}
		return true;
}

Template.editGroup.helpers({
    groupName: function() {
        return getGroupBeingEdited().name;
    },
    groups: function() {
        var allGroups = Groups.find({}).fetch();
        var formattedGroups = [];
        for(var i = 0; i < allGroups.length; i++) {
						//we don't want to include the group itself in the list
						if(groupsEqual(getGroupBeingEdited(), allGroups[i])) {
								continue;
						}
            var formattedGroup = {
                name: allGroups[i].name,
                groupId: allGroups[i]._id,
                checked: containsAllStudentsInEditingGroup(getGroupBeingEdited(), allGroups[i])
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
                studentId: student._id,
                checked: studentIsInGroup(getGroupBeingEdited(), student)
            }
            formattedStudents.push(formattedStudent);
        }
        return formattedStudents;
    }
});

//Checks the group being edited studentIds against the group in question and will return true if
//the group in question contains all the students in the group being edited. Else it returns false
var containsAllStudentsInEditingGroup = function(groupBeingEdited, groupToCheckStudentsAgainst) {
    for(var i = 0; i < groupToCheckStudentsAgainst.studentIds.length; i++) {
        if(groupBeingEdited.studentIds.indexOf(groupToCheckStudentsAgainst.studentIds[i]) == -1) {
            return false;
        }
    }
    return true;
}

//Determines if a student is in the group being edited, and returns true if that is the case
//Else returns false
var studentIsInGroup = function(groupBeingEdited, student) {
    return !(groupBeingEdited.studentIds.indexOf(student._id) == -1);
}
