import { Student } from '../../../collections/student.js';
import { Instructor } from '../../../collections/instructor.js';
import { Groups } from '../../../collections/groups.js';

var bestGroups = [];
var groupType = "";

editSugg_dep = new Deps.Dependency;
editSuggName_dep = new Deps.Dependency;

Template.editSuggested.onCreated(function() {
    bestGroups = JSON.parse(localStorage.getItem('bestGroupsTransfer'));
		groupType = localStorage.getItem('groupType');
    localStorage.removeItem('bestGroupsTransfer');
		localStorage.removeItem('groupType');

    if(bestGroups == undefined) {
				FlowRouter.go("/groups");
    }
    console.log(bestGroups);

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
				if (subscription.ready()) {
						editSugg_dep.changed()
            editSuggName_dep.changed()
				}
		});
});

Template.editSuggested.events({
		"click #saveGroupsButton"(event) {
        event.preventDefault();
        const form = event.target;

				var inputs = document.getElementsByTagName("INPUT");
				var coachBoxes = [];
				for(i = 0; i < inputs.length; i++) {
						if(inputs[i].type == "checkbox" && inputs[i].checked && inputs[i].className == "coachBox") {
								coachBoxes.push(inputs[i]);
						}
				}
				for(i = 0; i < bestGroups.length; i++) {
						var coaches = [];
						var coachNames = [];
						for(ii = 0; ii < coachBoxes.length; ii++) {
								if(coachBoxes[ii].id == coachBoxes[ii].value + bestGroups[i].groupId) {
										coaches.push(coachBoxes[ii].value);
										var coach = Instructor.findOne({_id: coachBoxes[ii].value});
										coachNames.push(coach.name);
								}
						}

						var studentsInEach = bestGroups[i].students;
						var size = studentsInEach.length;
						var stringSize = size.toString();

						var studentIds = [];
						var studentNames = [];
						studentsInEach.forEach(function(student) {
								studentIds.push(student.studentId);
								studentNames.push(student.name);
						});

						var dateCreated = new Date().getTime();

						var data = {
								name: bestGroups[i].name,
								studentIds: studentIds,
								coaches: coaches,
								coachNames: coachNames,
								size: size,
								stringSize: stringSize,
								studentNames: studentNames,
								groupType: groupType,
								dateCreated: dateCreated
						};

						Meteor.call('createGroupsSugg', data);
				}
        FlowRouter.go("/groups");
    },
    "click .editSuggBtn"(event) {
        event.preventDefault();
        const target = event.target;
        var thisGroupId = event.target.id;
        var dropGroupId = document.getElementById("select" + thisGroupId).value;

        var inputs = document.getElementsByTagName("INPUT");

        var swappingIds = [];
        for(var i = 0; i < inputs.length; i++) {
            if(inputs[i].type == "checkbox" && inputs[i].className == "student" + thisGroupId && inputs[i].checked) {
                swappingIds.push(inputs[i].id);
            }
        }
        var swapping = [];
        for(var i = 0; i < bestGroups.length; i++) {
            var eachId = bestGroups[i].groupId;
            if(eachId == thisGroupId) {
                for(var ii = 0; ii < swappingIds.length; ii++) {
                    var eachStudentSwapId = swappingIds[ii];
                    for(var iii = 0; iii < bestGroups[i].students.length; iii++) {
                        var eachStudentIn = bestGroups[i].students[iii];
                        if(eachStudentIn.studentId == eachStudentSwapId) {
                            swapping.push(eachStudentIn);
                            bestGroups[i].students.splice(iii,1);
                        }
                    }
                }
                break;
            }
        }
        for(var i = 0; i < bestGroups.length; i++) {
            var eachId = bestGroups[i].groupId;
            if(eachId == dropGroupId) {
                for(var ii = 0; ii < swapping.length; ii++) {
                    bestGroups[i].students.push(swapping[ii]);
                }
                break;
            }
        }
        for(var i = 0; i < inputs.length; i++) {
            if(inputs[i] != undefined && inputs[i].type == "checkbox" && inputs[i].checked) {
                if(inputs[i].className == "student" + thisGroupId) {
                    inputs[i].checked = false;
                }
            }
        }
        editSugg_dep.changed()
    },
		"click #cancel"(event) {
				FlowRouter.go("/groups");
		},
    "focusout .groupNameClass"(event) {
        var target = event.target;
        var groupName = target.value;
        var nameGroupId = event.target.id;
        for(var i = 0; i < bestGroups.length; i++) {
            var eachId = "name" + bestGroups[i].groupId;
            if(eachId == nameGroupId) {
                if(groupName != "") {
                    bestGroups[i].name = groupName;
                    editSuggName_dep.changed()
                    break;
                }
                else {
                    document.getElementById(nameGroupId).value = bestGroups[i].name;
                    break;
                }
            }
        }
		}
});

Template.editSuggested.helpers({
    suggestedGroups: function() {
        editSugg_dep.depend()
        var formattedGroups = [];
        for(var i = 0; i < bestGroups.length; i++) {
            var group = bestGroups[i];
            var formattedGroup = {
                name: group.name,
                students: group.students,
                groupId: group.groupId
                // coaches: group.coaches
            }
            formattedGroups.push(formattedGroup);
        }
        return formattedGroups;
    },
    otherGroups: function() {
        editSuggName_dep.depend()
        return bestGroups;
    },
    isOtherGroup: function(mainGroupId, thisGroupId) {
        editSuggName_dep.depend()
        if(mainGroupId != thisGroupId) {
            return true;
        }
        else {
            return false;
        }
    },
		instructors: function() {
  			var allInstructors = Instructor.find({}).fetch();
  			var formattedInstructors = [];
  			for(var i = 0; i < allInstructors.length; i++) {
  					var instructor = allInstructors[i];
  					var formattedInstructor = {
  							name: instructor.name,
  							instructorId: instructor._id
  							//checked: isCoach(instructor)
  					}
  					formattedInstructors.push(formattedInstructor);
  			}
  			return formattedInstructors;
		}
});
