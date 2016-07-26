import { Student } from '../../collections/student.js';
import { nameOfUser } from '../../lib/permissions.js';

Template.dashboard.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('Student');
    self.subscribe('Instructor');
    self.subscribe('userData');
  });
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
    }
});

Template.dashboard.events({
	'click #newUserButton':function(e) {
		FlowRouter.go('/dashboard/new');
	},
	'click #importUsersButton':function(e) {
		console.log("import students");
	},
    'click .deleteUserButton'(e) {
        var user = Meteor.users.findOne({username: e.target.id});
		console.log(user);
		Modal.show('deleteUserModal', user);
    }
});
