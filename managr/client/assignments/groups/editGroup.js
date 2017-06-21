import { Student } from '../../../collections/student.js';
import { Instructor } from '../../../collections/instructor.js';
import { Groups } from '../../../collections/groups.js';

var allAdded;
var allNotAdded;
_dep = new Deps.Dependency;

Template.editGroup.onCreated(function() {
		var id = FlowRouter.getParam('id');

		Meteor.subscribe("singleGroup", id);
		Meteor.subscribe("Coaches");

		this.autorun(function () {
				Meteor.subscribe("Student");
				Meteor.subscribe("CurrentAdded", id);
				Meteor.subscribe("CurrentNotAdded", id);
		});

		allAdded = [];
		allNotAdded = Student.find().fetch();
});

Template.editGroup.onRendered(function() {
		allAdded = [];
		allNotAdded = Student.find().fetch();
});

Template.editGroup.events({
		"submit #editGroupForm"(event) {
        event.preventDefault();
        const form = event.target;

				var groupId = FlowRouter.getParam('id');
        var groupName = form.groupName.value;
				var size = allAdded.length;
				console.log(groupName);
				var studentIds = [];
				var studentNames = [];
				allAdded.forEach(function(student) {
						studentIds.push(student._id);
						studentNames.push(student.name);
				});

				var inputs = document.getElementsByTagName("INPUT");
				var coaches = [];
				for(var i = 0; i < inputs.length; i++) {
						if(inputs[i].type == "checkbox" && inputs[i].checked && inputs[i].className == "coach") {
								//Because if it is a valid group, then that implies it is not a student, so we don't want this in our studentIds array
								var group = Groups.findOne({_id: inputs[i].id});
								if(group != undefined) {
										continue;
								}
								coaches.push(inputs[i].id);
						}
				}

				Meteor.call('updateGroup', groupId, groupName, studentIds, size, studentNames, coaches, allAdded);

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
								console.log(allAdded);
								console.log(swapping);
								allAdded.push(Student.findOne({ _id: inputs[i].id}));
								swapping.push(inputs[i].id);
								console.log(allAdded);
								console.log(swapping);
						}
				}
				console.log(allNotAdded);
				for(var i = 0; i < swapping.length; i++) {
					console.log(swapping[i]);
						for(var ii = 0; ii < allNotAdded.length; ii++) {
							console.log(allNotAdded[ii]._id);
								if(allNotAdded[ii]._id === swapping[i]) {
									console.log("DELETEING");
										allNotAdded.splice(ii, 1);
										ii = -1;
								}
						}
				}
				console.log(allNotAdded);
				var checkboxes = document.getElementsByTagName("input");
				for(var i = 0; i < checkboxes.length; i++) {
						if(checkboxes[i] != undefined && checkboxes[i].type == "checkbox") {
								if(checkboxes[i].className == "add" || checkboxes[i].id == "selectAllNotAdded") {
										checkboxes[i].checked = false;
								}
						}
				}
				_dep.changed()
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
								console.log(allNotAdded);
								console.log(swapping);
								allNotAdded.push(Student.findOne({ _id: inputs[i].id}));
								swapping.push(inputs[i].id);
								console.log(allNotAdded);
								console.log(swapping);
						}
				}
				console.log(allNotAdded);
				for(var i = 0; i < swapping.length; i++) {
					console.log(swapping[i]);
						for(var ii = 0; ii < allAdded.length; ii++) {
							console.log(allAdded[ii]._id);
								if(allAdded[ii]._id === swapping[i]) {
									console.log("DELETEING");
										allAdded.splice(ii, 1);
										ii = -1;
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
				_dep.changed()
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
								leader: group.leader
            }
            formattedGroups.push(formattedGroup);
        }
        return formattedGroups;
    },
		groupName: function() {
				var id = FlowRouter.getParam('id');
				var thisGroup = Groups.findOne({_id: id})
				return thisGroup.name;
		},
    otherstudents: function() {
				//var allStudentsNotAdded = Student.find({}).fetch();
				_dep.depend()
        var allStudentsNotAdded = allNotAdded;
				console.log(allNotAdded);
        var formattedStudents = [];
        for(var i = 0; i < allStudentsNotAdded.length; i++) {
            var student = allStudentsNotAdded[i];
            var formattedStudent = {
                name: student.name,
                studentId: student._id
            }
            formattedStudents.push(formattedStudent);
        }
				console.log(formattedStudents);
        return formattedStudents;
    },
		addedstudents: function() {
				//var allStudentsAdded = Student.find({}).fetch();
				_dep.depend()
        var allStudentsAdded = allAdded;
				console.log(allAdded);
        var formattedStudents = [];
        for(var i = 0; i < allStudentsAdded.length; i++) {
            var student = allStudentsAdded[i];
            var formattedStudent = {
                name: student.name,
                studentId: student._id
            }
            formattedStudents.push(formattedStudent);
        }
				console.log(formattedStudents);
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
			console.log(formattedInstructors);
			return formattedInstructors;
		}
});

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

var isCoach = function(instructor) {
		var id = FlowRouter.getParam('id');
		var thisGroup = Groups.findOne({_id: id})
		var coachesInGroup = thisGroup.coaches;
		for(var i = 0; i < coachesInGroup.length; i++) {
				if(instructor._id == coachesInGroup[i]) {
						return true;
				}
		}
		return false;
}
