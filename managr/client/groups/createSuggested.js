import { Student } from '../../collections/student.js';
import { Groups } from '../../collections/groups.js';
import { Random } from 'meteor/random';

var allAdded = [];
var allNotAdded = [];
suggested_dep = new Deps.Dependency;

var alltypes = ["None"];

Template.createSuggested.onCreated(function() {
    Meteor.subscribe("Student");
    Meteor.subscribe("Groups");
    Meteor.subscribe("Coaches");

    this.autorun(function () {
        var subscription = Meteor.subscribe("Student");

        if (subscription.ready()) {
            allAdded = [];
            allNotAdded = Student.find().fetch();
            suggested_dep.changed()
            alltypes = ["None"];
        }
    });
});

Template.createSuggested.events({
		"submit #createSuggestedForm"(event) {

        document.getElementById('loading').style="display:initial";

        event.preventDefault();
        setTimeout(function(){
            const form = event.target;
            var valid = true;

            var groupType = document.getElementById("groupTypeSelect").value;

            if(groupType == "newType") {
                groupType = form.newGroupType.value;
            }
            var numberOf = parseInt(form.numTypeInput.value);
            var option = form.numType.value;
            var secondsInput = document.getElementById("timeSelect").value;
            if(secondsInput == "low") {
                secondsInput = 2;
            }
            else if(secondsInput == "medium") {
                secondsInput = 5;
            }
            else if(secondsInput == "high") {
                secondsInput = 10;
            }
            else {
                secondsInput = parseInt(form.waitTimeInput.value);
                if(isNaN(secondsInput)) {
                    secondsInput = 5;
                }
            }
            if (typeof(secondsInput) != "number") {
                valid = false;
                document.getElementById('loading').style="display:none";
                Modal.show('warningModal', {
                    title: 'Error',
                    text: 'An error has occurred.',
                    confirmText: 'Close',
                    confirmCallback: () => {}
                });
            }
            var secondsToRun = secondsInput;
            if (option == "Number Of Groups") {
                option = 1;
            }
            else if (option == "Students Per Group") {
                option = 2;
            }
            else {
                valid = false;
                document.getElementById('loading').style="display:none";
                Modal.show('warningModal', {
                    title: 'Error',
                    text: 'No generation option was selected.',
                    confirmText: 'Close',
                    confirmCallback: () => {}
                });
            }
            //A bit more than 90000 iterations can run each second
            var iterations = secondsToRun * 90000;

            if (numberOf < 2 && option == 2) {
                valid = false;
                document.getElementById('loading').style="display:none";
                Modal.show('warningModal', {
                    title: 'Error',
                    text: 'Not enough people in each group.',
                    confirmText: 'Close',
                    confirmCallback: () => {}
                });
            }
            if (numberOf < 2 && option == 1) {
                valid = false;
                document.getElementById('loading').style="display:none";
                Modal.show('warningModal', {
                    title: 'Error',
                    text: 'Not enough groups.',
                    confirmText: 'Close',
                    confirmCallback: () => {}
                });
            }
            if (allAdded.length < 3) {
                valid = false;
                document.getElementById('loading').style="display:none";
                Modal.show('warningModal', {
                    title: 'Error',
                    text: 'Not enough students were selected.',
                    confirmText: 'Close',
                    confirmCallback: () => {}
                });
            }

            if (valid) {
                var theStudents = [];
                for(i = 0; i < allAdded.length; i++) {
                    var student = {
                        studentId: allAdded[i]._id,
                        name: allAdded[i].name,
                        strengths: strengthNumbers(allAdded[i].strengths),
                        strengthStrings: allAdded[i].strengths,
                        domains: findDomains(allAdded[i].strengths)
                    }
                    theStudents.push(student);
                }

                var bestGroups = [];
                var bestScore = 9999;
                var start = Date.now();
                var groups = [];
                var score = 0;
                var iterationsDone = 0;
                secondsToRun = secondsToRun * 1000;

                //Run the best group finding algorithms
                while((Date.now() - start) < secondsToRun) {
                    theStudents = shuffle(theStudents);
                    groups = makeGroups(option, theStudents, numberOf);
                    score = scoreGroups(groups);
                    if (score < bestScore) {
                        bestGroups = groups;
                        bestScore = score;
                    }
                    iterationsDone++;
                }
                console.log("Best Group Set:");
                console.log(bestGroups);
                console.log("Best Score:");
                console.log(bestScore);

                var end = Date.now();
                console.log("Ms elapsed:");
                console.log(end - start);
                console.log("Ms elapsed per iteration:");
                console.log((end - start) / iterationsDone);
                console.log("Number of iterations:");
                console.log(iterationsDone);

                bestGroups.forEach(function(group) {
                    group.groupId = Random.id();
                });

                localStorage.setItem('bestGroupsTransfer', JSON.stringify(bestGroups));
                localStorage.setItem('groupType', groupType);

                FlowRouter.go("/groups/editSuggested");
            }
        },50);
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
		},
    "change #timeSelect"(event) {
        var speedSelected = event.target.value;
        if(speedSelected == "custom") {
            document.getElementById("secondsDiv").style.display = "inline-block";
        }
        else {
            document.getElementById("secondsDiv").style.display = "none";
        }
    }
});

Template.createSuggested.helpers({
    groups: function() {
        var allGroups = Groups.find({}).fetch();
        var formattedGroups = [];
        for(var i = 0; i < allGroups.length; i++) {
            var group = allGroups[i];
            var formattedGroup = {
                name: group.name,
                groupId: group._id,
                size: group.size,
                coaches: group.coaches,
                groupType: group.groupType
            }
            formattedGroups.push(formattedGroup);
        }
        return formattedGroups;
    },
    otherstudents: function() {
				suggested_dep.depend();
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
				suggested_dep.depend();
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
    }
});

var findDomains = function(domainStrengths) {
  var eachStudentDomains = [0,0,0,0];
  var executing = ["Achiever", "Arranger", "Belief", "Consistency", "Deliberative", "Discipline", "Focus", "Responsibility", "Restorative"];
  var influencing = ["Activator", "Command", "Communication", "Competition", "Maximizer", "Self-Assurance", "Significance", "Woo"];
  var relationship = ["Adaptability","Developer","Connectedness","Empathy","Harmony","Includer","Individualization","Positivity","Relator"];
  var strategic = ["Analytical","Context","Futuristic","Ideation","Input","Intellection","Learner","Strategic"];
  for(var iiii = 0; iiii < 5; iiii++) {
    if(executing.indexOf(domainStrengths[iiii]) != -1) {
      eachStudentDomains[0] += 1;
    }
    else if(influencing.indexOf(domainStrengths[iiii]) != -1) {
      eachStudentDomains[1] += 1;
    }
    else if(relationship.indexOf(domainStrengths[iiii]) != -1) {
      eachStudentDomains[2] += 1;
    }
    else if(strategic.indexOf(domainStrengths[iiii]) != -1) {
      eachStudentDomains[3] += 1;
    }
  }
  return eachStudentDomains;
}

var allStrengths = ["Achiever", "Activator", "Adaptability", "Analytical", "Arranger", "Belief", "Command", "Communication",
"Competition", "Connectedness", "Consistency", "Context", "Deliberative", "Developer", "Discipline", "Empathy", "Focus",
"Futuristic", "Harmony", "Ideation", "Includer", "Individualization", "Input", "Intellection", "Learner", "Maximizer",
"Positivity", "Relator", "Responsibility", "Restorative", "Self-Assurance", "Significance", "Strategic", "Woo"];

var strengthNumbers = function(numberStrengths) {
  var strengthsAsNumbers = [];
  for(var iii = 0; iii < 5; iii++) {
    strengthsAsNumbers.push(allStrengths.indexOf(numberStrengths[iii]) + 1);
  }
  return strengthsAsNumbers;
}

// Above runs for number of students, Below runs for number of iterations (above is not optimized)

// Shuffles/randomizes the students
var shuffle = function(array) {
  var counter = array.length;
  var temp;
  var iii;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    iii = (Math.random() * counter--) | 0;

    // And swap the last element with it
    temp = array[counter];
    array[counter] = array[iii];
    array[iii] = temp;
  }
  return array;
}

var makeGroups = function(option, allStudents, numberOf) {
  if (option == 1) {
    var length = allStudents.length;
    var num = Math.floor(length / numberOf);
    var offset = length % numberOf;
    var nameIndex = 1;
    var numDone = 0;
    var groupSet = new Array(numberOf);

    for (i = 0; i < numberOf; i++) {
      var count = num;
      if (offset > 0) {
        offset--;
        count++;
      }
      var currentStudents = new Array(count);
      for (ii = 0; ii < count; ii++) {
        currentStudents[ii] = allStudents[ii + numDone];
      }
      var eachDomains = [0,0,0,0];
      for (ii = 0; ii < currentStudents.length; ii++) {
        for (iii = 0; iii < 4; iii++) {
          eachDomains[iii] += currentStudents[ii].domains[iii];
        }
      }
      var formattedGroup = {
        name: "Group " + nameIndex,
        students: currentStudents,
        domains: eachDomains
      }
      groupSet[i] = formattedGroup;
      numDone += count;
      nameIndex++;
    }
  }

  else if (option == 2) {
    var length = allStudents.length;
    var numNeeded = Math.ceil(length / numberOf);
    var nameIndex = 1;
    var numDone = 0;
    var groupSet = new Array(numNeeded);

    for (i = 0; i < numNeeded; i++) {
      // Fixes last group having undefineds because there are not enough students left, will be changed
      if ((length - numDone) < numberOf) {
        numberOf = length - numDone;
      }
      var currentStudents = new Array(numberOf);
      for (ii = 0; ii < numberOf; ii++) {
        currentStudents[ii] = allStudents[ii + numDone];
      }
      var eachDomains = [0,0,0,0];
      for (ii = 0; ii < numberOf; ii++) {
        for (iii = 0; iii < 4; iii++) {
          eachDomains[iii] += currentStudents[ii].domains[iii];
        }
      }
      var formattedGroup = {
        name: "Group " + nameIndex,
        students: currentStudents,
        domains: eachDomains
      }
      groupSet[i] = formattedGroup;
      numDone += numberOf;
      nameIndex++;
    }
  }
  return groupSet;
}

var scoreGroups = function(theGroups) {
  var totalDomainScore = 0;
  var totalStrengthsScore = 0;
  for (i = 0, length = theGroups.length; i < length; i++) {
    var eachGroup = theGroups[i];
    var eachStudents = eachGroup.students;
    var slength = eachStudents.length;
    var bestAverage = slength * 5 / 4;
    var domainScore = 0;
    for (ii = 0; ii < 4; ii++) {
      domainScore += Math.abs(bestAverage - eachGroup.domains[ii]);
    }
    totalDomainScore += domainScore;

    var groupStrengths = {};
    for (ii = 0; ii < slength; ii++) {
      var eachStrengths = eachStudents[ii].strengths;
      for (iii = 0; iii < 5; iii++) {
        if (groupStrengths[eachStrengths[iii]] != undefined) {
          groupStrengths[eachStrengths[iii]] += 1;
        }
        else {
          groupStrengths[eachStrengths[iii]] = 1;
        }
      }
    }
    var strengthScore = 0;
    for (ii = 0; ii < 34; ii++) {
      if (groupStrengths[ii] != undefined) {
        strengthScore += groupStrengths[ii] - 1;
      }
    }
    strengthScoreWeighted = strengthScore * 4.75 / (slength + .5);

    totalDomainScore += domainScore;
    totalStrengthsScore += strengthScoreWeighted;
  }
  return totalDomainScore + totalStrengthsScore;
}
