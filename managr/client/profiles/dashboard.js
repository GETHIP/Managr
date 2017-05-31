import { Student } from '../../collections/student.js';
import { Instructor } from '../../collections/instructor.js';
import { nameOfUser } from '../../lib/permissions.js';
import { Globals } from '../../collections/globals.js';

function validateStudentData(dataArray) {
    if (dataArray == undefined || dataArray.length == 0) {
        return "Error: The file contains no students.";
    }
    var zipCodeRegex = /^[\d]{5}([-][\d]{4})?$/;
    var numberRegex = /[0-9]+/;
    for (i in dataArray) {
        if (dataArray[i].FirstName == undefined && dataArray[i].LastName == undefined) {
            return ("Error: File must be a properly formatted Comma Separated Values file. Refer to the Example CSV at the bottom of the Dashboard.")
        }
        if (dataArray[i].FirstName == "") {
            return "Error: FirstName field is required.";
        } else if (dataArray[i].LastName == "") {
            return "Error: LastName field is required.";
        } else if (dataArray[i].Email == "") {
            return "Error: Email field is required.";
        } else if (!numberRegex.test(dataArray[i].Age) && dataArray[i].Age != "") {
            return "Error: Age field must be a number.";
        } else if (!zipCodeRegex.test(dataArray[i].ZipCode) && dataArray[i].ZipCode != "") {
            return "Error: Zip code must be of format ##### or #####-####.";
        } else if (!numberRegex.test(dataArray[i].GetHipYear) && dataArray[i].GetHipYear != "") {
            return "Error: GetHipYear field must be a number.";
        }
    }
    return false;
}

Template.dashboard.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('Student');
    self.subscribe('Instructor');
    self.subscribe('userData');
	self.subscribe('Globals');
  });
  Template.instance().importingStudents = new ReactiveVar(false);
});

Template.dashboard.helpers({
    users: function() {
        var users = Meteor.users.find({}).map((u) => {
			u.name = nameOfUser(u._id);
			if (u.name == undefined) {
				//We don't publish archived users, so
				//an undefined name means the user is archived.
				//(Technically, it could mean the user failed to
				//upload, but that shouldn't happen actually).
				u.name = "Archived";
			}
			u.role = u.roles[0].charAt(0).toUpperCase() + u.roles[0].slice(1);
			return u;
		});
        /*for(var i in users) {
            users[i].selected = users;
        }*/
        return users;
    },
    userHasRole(roles, role) {
        for (var i in roles) {
            if (roles[i] == role) {
                return {
                    value: role,
                    selected: "selected"
                };
            }
        }
        return {
            value: role
        };
    },
	importingStudents: function() {
		return Template.instance().importingStudents.get();
	},
	showArchiveButton: function() {
		return Student.findOne({ userId: this._id }) != undefined && Instructor.findOne({ userId: this._id }) == undefined;
	},
	showUnarchiveButton: function() {
		//We don't publish the student documents of archived users.
		//Hence, Student.findOne will return undefined.
		//We also want to make sure the user is not an instructor,
		//because instructors don't exist in the students collection.
		return Student.findOne({ userId: this._id }) == undefined && Instructor.findOne({ userId: this._id }) == undefined;
	},
	numberOfWeeks: function() {
		return Globals.numberOfWeeks();
	}
});

Template.dashboard.events({
	'click #newUserButton':function(e) {
		FlowRouter.go('/dashboard/new');
	},
	'change #usersFile':function(e) {
		var fileReader = new FileReader();
		var templateInstance = Template.instance();
		fileReader.onload = function(result) {
			var csvArray = csvToArray(result.target.result, ',');
			var alreadyFailed = false;
            var validationError = validateStudentData(csvArray);
            if (validationError) {
                document.getElementById('usersFile').value = [];
                Modal.show('warningModal', {
                    title: 'Error',
                    text: validationError,
                    confirmText: 'Dismiss',
                    confirmCallback: () => {}
                });
                return;
            }
			for (i in csvArray) {
				Meteor.call('addStudent', csvArray[i], function(error, result) {
					if (result != "" && !alreadyFailed) {
						alreadyFailed = true;
                        document.getElementById('usersFile').value = [];
						Modal.show('warningModal', {
							title: 'Error',
							text: 'Loading users failed. Some users might not have loaded correctly.',
							confirmText: 'Dismiss',
							confirmCallback: () => {}
						});
					}
				});
			}
		};
		fileReader.readAsText(e.target.files[0]);
	},
    'click .realDeleteUserButton':function(e) {
        var user = Meteor.users.findOne({username: e.target.id});
		Modal.show('deleteUserModal', user);
    },
	'click #dummyCSVButton':function(e) {
		var fields = [
			"FirstName",
			"LastName",
			"School",
			"Age",
			"Email",
			"Description",
			"Grade",
			"GetHipYear",
			"PhoneNumber",
			"Blog",
			"Github",
			"TShirtSize",
			"Street",
			"City",
			"State",
			"ZipCode",
			"Parent 1",
			"Parent 2",
			"Strength 1",
			"Strength 2",
			"Strength 3",
			"Strength 4",
			"Strength 5",
			"EP 10 1",
			"EP 10 2",
			"EP 10 3",
			"EP 10 4"
		];
		var columns = fields.join(",");
		let csv = Papa.unparse({ fields: fields });
		csv = new Blob([csv], { type: 'text/csv;charset=utf-8;' } );
		saveAs(csv, "Students.csv");
	},
	'click #archiveButton':function(event) {
		Modal.show('archiveStudentModal', {
			uppercaseText: "Archive",
			lowercaseText: "archive",
			username: this.username,
			_id: this._id,
			isArchived: true
		});
		// Meteor.call('archiveStudent', this._id, true);
	},
	'click #unarchiveButton':function(event) {
		Modal.show('archiveStudentModal', {
			uppercaseText: "Unarchive",
			lowercaseText: "unarchive",
			username: this.username,
			_id: this._id,
			isArchived: false
		});
		// Meteor.call('archiveStudent', this._id, false);
	},
	'submit #numberOfWeeksForm':function(event) {
		event.preventDefault();
		if (event.target.value <= 0) {
			Modal.show('warningModal', {
				title: 'Error',
				text: 'Number of weeks must be positive.',
				confirmText: 'Dismiss.'
			});
			return;
		} else {
			Modal.show('warningModal', {
				title: 'Confirmation',
				text: 'Are you sure you want to change the number of weeks (this does not reset attendance)?',
				confirmText: 'Confirm',
				confirmCallback: function(callbackData) {
					console.log(callbackData);
					Meteor.call('updateNumberOfWeeks', callbackData);
				},
				callbackData: event.target.numberOfWeeks.value
			});
		}
	},
	'click #resetAttendanceButton':function(event) {
		Modal.show('warningModal', {
			title: 'Confirmation',
			text: 'Are you sure you want to reset the attendance of all (including archived) students?',
			confirmText: 'Confirm',
			confirmCallback: function(callbackData) {
				Meteor.call('resetAttendance');
			}
		});
	}
});
