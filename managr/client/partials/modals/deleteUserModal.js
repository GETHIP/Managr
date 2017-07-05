import { Student } from '../../../collections/student.js';

 Template.deleteUserModal.onCreated(function(){
   Meteor.subscribe('Student');
 });

Template.deleteUserModal.helpers({
	username: function() {
		return Template.instance().data.username;
	}
});

Template.deleteUserModal.events({
	'click #confirmDeleteUser':function(event) {
	var id =	Student.findOne({userId: Template.instance().data._id})._id;
		console.log("Deleting: ", Template.instance().data._id);
		Meteor.call("removeUEvals", id);
		Meteor.call('deleteUser', Template.instance().data._id);

	}
});
