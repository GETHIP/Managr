import { Student } from '../../collections/student.js';

Template.dashboard.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('Student');
    self.subscribe('userData');
  });
});

Template.newUser.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('Student');
    self.subscribe('userData');
  });
});

Template.dashboard.helpers({
    users: function() {
        var users = Meteor.users.find({});
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
    'click .deleteUserButton'(e) {
        var a = confirm('Are you sure you want to delete this user?');
        if(a != null) {

            var user = Meteor.users.findOne({username: e.target.id});

            var id = user._id;

            console.log(user);

            Meteor.call('deleteUser', {
                userId: id
            });

            console.log(id);
            console.log(e.target.id);
        }
    }
});
