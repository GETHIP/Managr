import { Student } from '../../collections/student.js';
import { nameOfUser } from '../../lib/permissions.js';

Template.dashboard.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('Student');
    self.subscribe('Instructor');
    self.subscribe('userData');
  });
  Template.instance().importingStudents = new ReactiveVar(false);
});

Template.dashboard.helpers({
    users: function() {
        var users = Meteor.users.find({}).map((u) => {
			u.name = nameOfUser(u._id);
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
			for (i in csvArray) {
				Meteor.call('addStudent', csvArray[i], function(error, result) {
					if (result != "") {
						alert("Failed to create students...");
					}
				});
			}
		};
		fileReader.readAsText(e.target.files[0]);
	},
    'click .deleteUserButton':function(e) {
        var user = Meteor.users.findOne({username: e.target.id});
		console.log(user);
		Modal.show('deleteUserModal', user);
    },
	'click #dummyCSVButton':function(e) {
		var fields = [
			"Name",
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
		console.log(columns);
		let csv = Papa.unparse({ fields: fields });
		csv = new Blob([csv], { type: 'text/csv' } );
		saveAs(csv, "Students.csv");
	}
});
