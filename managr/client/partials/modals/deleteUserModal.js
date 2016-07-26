Template.deleteUserModal.helpers({
	username: function() {
		return Template.instance().data.username;
	}
});

Template.deleteUserModal.events({
	'click #confirmDeleteUser':function(event) {
		console.log("Deleting: ", Template.instance().data._id);
		Meteor.call('deleteUser', Template.instance().data._id);
	}
});