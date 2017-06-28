import { Student } from '../../../collections/student.js';
import { Groups } from '../../../collections/groups.js';

var allAdded = [];
var allNotAdded = [];
suggested_dep = new Deps.Dependency;

Template.createSuggested.onCreated(function() {
    Meteor.subscribe("Student");
    Meteor.subscribe("Groups");

    this.autorun(function () {
        var subscription = Meteor.subscribe("Student");
        //Meteor.subscribe("CurrentAdded", id);
        //Meteor.subscribe("CurrentNotAdded", id);
        if (subscription.ready()) {
            allAdded = [];
            allNotAdded = Student.find().fetch();
            suggested_dep.changed()
        }
    });
    // var self = this;
    // self.autorun(function() {
    //   self.subscribe('Student');
    // })
});

Template.createSuggested.events({
		"submit #createSuggestedForm"(event) {
        event.preventDefault();
        const form = event.target;
        var valid = true;

        var numberOf = form.numTypeInput.value;
        var option = form.numType.value;
        console.log(numberOf);
        console.log(option);

        var formattedStudents = [];
        allAdded.forEach(function(student) {
            var formattedStudent = {
                name: student.name,
                studentId: student._id
            }
            formattedStudents.push(formattedStudent);
        });

        if (option == "Number Of Groups") {
            var num = Math.floor(formattedStudents.length / numberOf);
            var offset = formattedStudents.length % numberOf;
            var groups = [];
            var i = 1;
            while (formattedStudents.length > 0) {
                var count = num;
                if (offset > 0) {
                    offset--;
                    count++;
                }
                var currentStudents = formattedStudents.splice(0, count);
                var formattedGroup = {
                    name: "Group " + i,
                    students: currentStudents
                }
                groups.push(formattedGroup);
                i++;
            }
        }
        else if (option == "Students Per Group") {
            var groups = [];
            var i = 1;
            while (formattedStudents.length > 0) {
                var currentStudents = formattedStudents.splice(0, numberOf);
                var formattedGroup = {
                    name: "Group " + i,
                    students: currentStudents
                }
                groups.push(formattedGroup);
                i++;
            }
        }
        else {
            valid = false;
            Modal.show('warningModal', {
                title: 'Error',
                text: 'No generation option was selected.',
                confirmText: 'Retry',
                confirmCallback: () => {}
            });
        }

        if (valid) {
            var params = groups;
            FlowRouter.go("/groups/editSuggested");
            BlazeLayout.render("groupsLayout", {content:'editSuggested', groups: params});
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
										ii = allNotAdded.length;
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
				suggested_dep.changed()
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
				suggested_dep.changed()
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

Template.createSuggested.helpers({
    otherstudents: function() {
				suggested_dep.depend();
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
				suggested_dep.depend();
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
    }
});
