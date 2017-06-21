import { Student } from '../../../collections/student.js';
import { Groups } from '../../../collections/groups.js';

var allAdded;
var allNotAdded;

Template.createGroup.onCreated(function() {
		Meteor.subscribe("Student");
    Meteor.subscribe("Groups");
		Meteor.subscribe("CurrentAdded");
		Meteor.subscribe("CurrentNotAdded");

		allAdded = [];
		allNotAdded = Student.find().fetch();
});

Template.createGroup.onRendered(function() {
		allAdded = [];
		allNotAdded = Student.find().fetch();
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
				var size = studentIds.length;
				var studentNames = newformatStudentsForGroup(studentIds);
				// Stores date as a number (number of milliseconds since 1970)
				var dateCreated = new Date().getTime()

        Meteor.call("createGroup", groupName, studentIds, size, studentNames, dateCreated);

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
				var studentIds = [];
				for(var i = 0; i < inputs.length; i++) {
						if(inputs[i].type == "checkbox" && inputs[i].className == "add" && inputs[i].checked) {
								//Because if it is a valid group, then that implies it is not a student, so we don't want this in our studentIds array
								var group = Groups.findOne({_id: inputs[i].id});
								if(group != undefined) {
										continue;
								}
								console.log(allAdded);
								console.log(swapping);
								allAdded.push(inputs[i].id);
								swapping.push(inputs[i].id);
								console.log(allAdded);
								console.log(swapping);
						}
				}
				for(var i = swapping.length - 1; i >= 0; i--) {
						for(var ii = allNotAdded.length - 1; ii >= 0; ii--) {
								if(allNotAdded[ii] === swapping[i]) {
										allNotAdded.splice(ii, 1);
										ii = -1;
								}
						}
				}
				// addedss = document.getElementById('addedstudents');
				// addedss.innerHTML = "{{#each otherstudents}}" + "<label for='{{{studentId}}}' class='studentLabel'>" + "<input type='checkbox' class='add' id='{{{studentId}}}'/>" + "{{{name}}}" + "</label>" + "{{/each}}";
				// console.log(addedss.innerHTML);
		},
		"click #removeStudents"(event) {
				event.preventDefault();
				const form = event.target;

				var inputs = document.getElementsByTagName("INPUT");

				var studentIds = [];
				for(var i = 0; i < inputs.length; i++) {
						if(inputs[i].type == "checkbox" && inputs[i].className == "remove" && inputs[i].checked) {
								//Because if it is a valid group, then that implies it is not a student, so we don't want this in our studentIds array
								var group = Groups.findOne({_id: inputs[i].id});
								if(group != undefined) {
										continue;
								}
								console.log(allNotAdded);
								console.log(swapping);
								allNotAdded.push(inputs[i].id);
								swapping.push(inputs[i].id);
								console.log(allNotAdded);
								console.log(swapping);
						}
				}
				for(var i = swapping.length - 1; i >= 0; i--) {
						for(var ii = allAdded.length - 1; ii >= 0; ii--) {
								if(allAdded[ii] === swapping[i]) {
										allAdded.splice(ii, 1);
										ii = -1;
								}
						}
				}
				// otherss = document.getElementById("otherstudents").innerHTML;
				// otherss.innerHTML = "{{{#each addedstudents}}}" + "<label for='{{{studentId}}}' class='studentLabel'>" + "<input type='checkbox' class='remove' id='{{{studentId}}}'/>" + "{{{name}}}" + "</label>" + "{{{/each}}}";
				// console.log(otherss.innerHTML);
		}
		// "click #removeStudents"(event) {
		// 		event.preventDefault();
		// 		const form = event.target;
		//
		// 		var inputs = document.getElementsByTagName("INPUT");
		//
		// 		for(var i = 0; i < inputs.length; i++) {
		// 				if(inputs[i].type == "checkbox" && inputs[i].class == "remove" && inputs[i].checked) {
		// 						//Because if it is a valid group, then that implies it is not a student, so we don't want this in our studentIds array
		// 						var group = Groups.findOne({_id: inputs[i].id});
		// 						if(group != undefined) {
		// 								continue;
		// 						}
		// 						console.log(allAdded);
		// 						allnotAdded.push(inputs[i].id);
		// 						console.log(allAdded);
		// 				}
		// 		}
		// }
});

// Handlebars.registerHelper("addeds", function(fn) {
//   $('input').html(fn(this));
// 	console.log("Running");
//
//   return "";
// });
//
// Handlebars.registerHelper("others", function(fn) {
//   $('input').html(fn(this));
// 	console.log("Running");
//
//   return "";
// });

Template.createGroup.helpers({
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
    otherstudents: function() {
				//var allStudentsNotAdded = Student.find({}).fetch();
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
				console.log(formattedStudents);
        return formattedStudents;
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
