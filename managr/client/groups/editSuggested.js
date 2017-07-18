import { Student } from '../../collections/student.js';
import { Instructor } from '../../collections/instructor.js';
import { Groups } from '../../collections/groups.js';

var bestGroups = [];
var groupType = "";

var allValid = 0;

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

		Meteor.subscribe("Groups");
		Meteor.subscribe("Coaches");

		this.autorun(function () {
				var subscription = Meteor.subscribe("Student");
				if (subscription.ready()) {
						editSugg_dep.changed()
            editSuggName_dep.changed()
            allValid = 0;
				}
		});
});

var checkGroups = function() {
    for(var i = 0; i < bestGroups.length; i++) {
        var foundInGroups = Groups.findOne({ name: bestGroups[i].name });
        var currentText = document.getElementsByClassName("notUniqueSugg")[i];
        if(foundInGroups != null) {
            if(currentText.style.display == "none") {
                allValid++;
            }
            currentText.style.display = "initial";
        }
    }
}

Template.editSuggested.events({
		"click #saveGroupsButton"(event) {
        event.preventDefault();
        const form = event.target;

        checkGroups();

        if(allValid == 0) {
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
        }
        else {
            Modal.show('warningModal', {
                title: 'Error',
                text: 'Group names must be unique.',
                confirmText: 'Close',
                confirmCallback: () => {}
            });
        }
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
        var foundInGroups = Groups.findOne({ name: groupName });
        var foundInSugg = false;
        for(var i = 0; i < bestGroups.length; i++) {
            var eachId = "name" + bestGroups[i].groupId;
            if(eachId != nameGroupId && bestGroups[i].name == groupName) {
                foundInSugg = true;
            }
        }
        for(var i = 0; i < bestGroups.length; i++) {
            var eachId = "name" + bestGroups[i].groupId;
            if(eachId == nameGroupId) {
                var currentText = document.getElementsByClassName("notUniqueSugg")[i];
                if(groupName != "" && foundInGroups == null && foundInSugg == false) {
                    bestGroups[i].name = groupName;
                    if(currentText.style.display == "initial") {
                        allValid--;
                    }
                    currentText.style.display = "none";
                    editSuggName_dep.changed()
                }
                else if(groupName == "") {
                    document.getElementById(nameGroupId).value = bestGroups[i].name;
                }
                else if(foundInGroups != null || foundInSugg == true) {
                    if(currentText.style.display == "none") {
                        allValid++;
                    }
                    currentText.style.display = "initial";
                }
                break;
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
            var eachStudents = group.students;

            var bestAverage = eachStudents.length * 5 / 4;
            var eachPercentDomains = [{amount:0,percent:0},{amount:0,percent:0},{amount:0,percent:0},{amount:0,percent:0}];
            for (ii = 0; ii < eachStudents.length; ii++) {
                for (iii = 0; iii < 4; iii++) {
                    eachPercentDomains[iii].amount += eachStudents[ii].domains[iii];
                }
            }
            var highestDomain = 0;
            var bestAveragePercent = {amount:bestAverage,percent:0};
            for (ii = 0; ii < 4; ii++) {
                if (eachPercentDomains[ii].amount > highestDomain) {
                    highestDomain = eachPercentDomains[ii].amount;
                    bestAveragePercent.percent = bestAverage / eachPercentDomains[ii].amount * 100;
                }
            }
            for (ii = 0; ii < 4; ii++) {
                eachPercentDomains[ii].percent = eachPercentDomains[ii].amount / highestDomain * 100;
            }
            var formattedGroup = {
                name: group.name,
                students: eachStudents,
                groupId: group.groupId,
                domains: eachPercentDomains,
                bestAverage: bestAveragePercent
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
  					}
  					formattedInstructors.push(formattedInstructor);
  			}
  			return formattedInstructors;
		}
});
