import { Student } from '../../../collections/student.js';
import { Instructor } from '../../../collections/instructor.js';
import { Groups } from '../../../collections/groups.js';

var allAdded = [];
var allNotAdded = [];
edit_dep = new Deps.Dependency;

var alltypes = ["None"];

Template.editGroup.onCreated(function() {
		var id = FlowRouter.getParam('id');

		// Meteor.subscribe('singleGroup', id, function() {
		// 		var group = Groups.findOne({_id: id});
		// 		if(group == undefined) {
		// 				FlowRouter.go("/groups");
		// 		}
		// 		else {
		// 				BlazeLayout.render("groupsLayout", {content: 'editGroup'});
		// 		}
		// });
		Meteor.subscribe("Groups");
		Meteor.subscribe("Coaches");

		this.autorun(function () {
				var subscription = Meteor.subscribe("Student");
				//Meteor.subscribe("CurrentAdded", id);
				//Meteor.subscribe("CurrentNotAdded", id);
				if (subscription.ready()) {
						allAdded = findStudentsIn();
						allNotAdded = findStudentsNot(allAdded);
						alltypes = ["None"];
						edit_dep.changed()
				}
		});
});

function findStudentsIn() {
		var allAdded = [];
		var thisGroup = Groups.findOne({ _id: FlowRouter.getParam('id')});
		if(!thisGroup) {
			return;
		}
		var groupStudentIds = thisGroup.studentIds;
		for(var i = 0; i < groupStudentIds.length; i++) {
				var thisStudent = Student.findOne({ _id: groupStudentIds[i] });
				allAdded.push(thisStudent);
		}
		return allAdded;
}

function findStudentsNot(allAdded) {
		allNotAdded = Student.find().fetch();
		for(var i = 0; i < allAdded.length; i++) {
				for(var ii = 0; ii < allNotAdded.length; ii++) {
						if(allNotAdded[ii]._id === allAdded[i]._id) {
								allNotAdded.splice(ii,1);
								ii = allNotAdded.length;
						}
				}
		}
		return allNotAdded;
}

Template.editGroup.events({
		"submit #editGroupForm"(event) {
        event.preventDefault();
        const form = event.target;

				var groupId = FlowRouter.getParam('id');
        var groupName = form.groupName.value;
				var groupType = document.getElementById("groupTypeSelect").value;
				if(groupType == "newType") {
						groupType = form.newGroupType.value;
				}
				var size = allAdded.length;
				var stringSize = size.toString();
				var studentIds = [];
				var studentNames = [];
				allAdded.forEach(function(student) {
						studentIds.push(student._id);
						studentNames.push(student.name);
				});

				var inputs = document.getElementsByTagName("INPUT");
				var coaches = [];
				var coachNames = [];
				for(var i = 0; i < inputs.length; i++) {
						if(inputs[i].type == "checkbox" && inputs[i].checked && inputs[i].className == "coach") {
								//Because if it is a valid group, then that implies it is not a student, so we don't want this in our studentIds array
								var group = Groups.findOne({_id: inputs[i].id});
								if(group != undefined) {
										continue;
								}
								coaches.push(inputs[i].id);
								var coach = Instructor.findOne({_id: inputs[i].id});
								coachNames.push(coach.name);
						}
				}
				var data = {
						name: groupName,
						studentIds: studentIds,
						coaches: coaches,
						coachNames: coachNames,
						size: size,
						stringSize: stringSize,
						studentNames: studentNames,
						groupType: groupType
				};

				ifNameInName = 0
				if ((groupName != null) && (Groups.findOne({ name: groupName }) == null)) {
					ifNameInName = 2;
				} else {
					document.getElementsByClassName("notUnique2")[0].style.display = "initial";
				}

				if (ifNameInName == 2) {
					Meteor.call('updateGroup', groupId, data);
	        FlowRouter.go("/groups");
					}
				},

		"click #addStudents"(event) {
				event.preventDefault();
				const form = event.target;

				var inputs = document.getElementsByTagName("INPUT");

				var swapping = [];
				for(var i = 0; i < inputs.length; i++) {
						if(inputs[i].type == "checkbox" && inputs[i].className == "add" && inputs[i].checked) {
								//Because if it is a valid group, then that implies it is not a student, so we don't want this in our studentIds array
								var group = Groups.findOne({_id: inputs[i].id});
								if(group != undefined) {
										continue;
								}
								allAdded.push(Student.findOne({ _id: inputs[i].id}));
								swapping.push(inputs[i].id);
						}
				}
				for(var i = 0; i < swapping.length; i++) {
						for(var ii = 0; ii < allNotAdded.length; ii++) {
								if(allNotAdded[ii]._id === swapping[i]) {
										allNotAdded.splice(ii, 1);
										ii = allNotAdded.length;
								}
						}
				}
				var checkboxes = document.getElementsByTagName("input");
				for(var i = 0; i < checkboxes.length; i++) {
						if(checkboxes[i] != undefined && checkboxes[i].type == "checkbox") {
								if(checkboxes[i].className == "add" || checkboxes[i].id == "selectAllNotAdded") {
										checkboxes[i].checked = false;
								}
						}
				}
				edit_dep.changed()
		},
		"click #removeStudents"(event) {
				event.preventDefault();
				const form = event.target;

				var inputs = document.getElementsByTagName("INPUT");

				var swapping = [];
				for(var i = 0; i < inputs.length; i++) {
						if(inputs[i].type == "checkbox" && inputs[i].className == "remove" && inputs[i].checked) {
								//Because if it is a valid group, then that implies it is not a student, so we don't want this in our studentIds array
								var group = Groups.findOne({_id: inputs[i].id});
								if(group != undefined) {
										continue;
								}
								allNotAdded.push(Student.findOne({ _id: inputs[i].id}));
								swapping.push(inputs[i].id);
						}
				}
				for(var i = 0; i < swapping.length; i++) {
						for(var ii = 0; ii < allAdded.length; ii++) {
								if(allAdded[ii]._id === swapping[i]) {
										allAdded.splice(ii, 1);
										ii = allAdded.length;
								}
						}
				}
				var checkboxes = document.getElementsByTagName("input");
				for(var i = 0; i < checkboxes.length; i++) {
						if(checkboxes[i] != undefined && checkboxes[i].type == "checkbox") {
								if(checkboxes[i].className == "remove" || checkboxes[i].id == "selectAllAdded") {
										checkboxes[i].checked = false;
								}
						}
				}
				edit_dep.changed()
		},
		"click #selectAllAdded"(event) {
				var currentState = document.getElementById("selectAllAdded").checked;
				var checkboxes = document.getElementsByTagName("input");
				for(var i = 0; i < checkboxes.length; i++) {
						if(checkboxes[i] != undefined && checkboxes[i].type == "checkbox" && checkboxes[i].className == "remove") {
								checkboxes[i].checked = currentState;
						}
				}
		},
		"click #selectAllNotAdded"(event) {
				var currentState = document.getElementById("selectAllNotAdded").checked;
				var checkboxes = document.getElementsByTagName("input");
				for(var i = 0; i < checkboxes.length; i++) {
						if(checkboxes[i] != undefined && checkboxes[i].type == "checkbox" && checkboxes[i].className == "add") {
								checkboxes[i].checked = currentState;
						}
				}
		},
		"click #cancel"(event) {
				FlowRouter.go("/groups");
		},
		"change #groupTypeSelect"(event) {
				var type = event.target.value;
				if(type == "newType") {
						document.getElementById("newGroupType").style.display = "inline-block";
						$('#newGroupType').prop('required',true);

				}
				else {
						document.getElementById("newGroupType").style.display = "none";
						$('#newGroupType').removeAttr('required');
				}
		}
});

Template.editGroup.helpers({
    groups: function() {
        var allGroups = Groups.find({}).fetch();
        var formattedGroups = [];
        for(var i = 0; i < allGroups.length; i++) {
            var group = allGroups[i];
            var formattedGroup = {
                name: group.name,
                groupId: group._id,
								size: group.size,
								leader: group.leader,
								groupType: group.groupType
            }
            formattedGroups.push(formattedGroup);
        }
        return formattedGroups;
    },
		groupName: function() {
				var id = FlowRouter.getParam('id');
				var thisGroup = Groups.findOne({_id: id});
				return thisGroup.name;
		},
    otherstudents: function() {
				edit_dep.depend();
        var allStudentsNotAdded = allNotAdded;
        var formattedStudents = [];
        for(var i = 0; i < allStudentsNotAdded.length; i++) {
            var student = allStudentsNotAdded[i];
            var formattedStudent = {
                name: student.name,
                studentId: student._id
            }
            formattedStudents.push(formattedStudent);
        }
        return formattedStudents;
    },
		addedstudents: function() {
				edit_dep.depend();
        var allStudentsAdded = allAdded;
        var formattedStudents = [];
        for(var i = 0; i < allStudentsAdded.length; i++) {
            var student = allStudentsAdded[i];
            var formattedStudent = {
                name: student.name,
                studentId: student._id
            }
            formattedStudents.push(formattedStudent);
        }
        return formattedStudents;
    },
		instructors: function() {
			var allInstructors = Instructor.find({}).fetch();
			var formattedInstructors = [];
			for(var i = 0; i < allInstructors.length; i++) {
					var instructor = allInstructors[i];
					var formattedInstructor = {
							name: instructor.name,
							instructorId: instructor._id,
							checked: isCoach(instructor)
					}
					formattedInstructors.push(formattedInstructor);
			}
			return formattedInstructors;
		},
		uniquetypes: function(thisType) {
				result = true;
				for(var i = 0; i < alltypes.length; i++) {
						if(alltypes[i] == thisType) {
								result = false;
								break;
						}
				}
				if(result == true)
				{
						alltypes.push(thisType);
				}
				return result;
		},
    cleargrouptypes: function() {
        alltypes = ["None"];
    },
		thisgrouptype: function() {
				var id = FlowRouter.getParam('id');
				var thisGroup = Groups.findOne({_id: id});
				var thisType = thisGroup.groupType;
				if(thisType != "None") {
						alltypes.push(thisType);
						return true;
				}
				else {
						return false;
				}
		},
		getthisgrouptype: function() {
				var id = FlowRouter.getParam('id');
				var thisGroup = Groups.findOne({_id: id});
				return thisGroup.groupType;
		}
});

var isCoach = function(instructor) {
		var id = FlowRouter.getParam('id');
		var thisGroup = Groups.findOne({_id: id});
		var coachesInGroup = thisGroup.coaches;
		for(var i = 0; i < coachesInGroup.length; i++) {
				if(instructor._id == coachesInGroup[i]) {
						return true;
				}
		}
		return false;
}
