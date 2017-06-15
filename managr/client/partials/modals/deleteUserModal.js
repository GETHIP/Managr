Template.deleteUserModal.helpers({
	username: function() {
		return Template.instance().data.username;
	}
});

Template.deleteUserModal.events({
	'click #confirmDeleteUser':function(event) {
		Meteor.call('deleteUser', Template.instance().data._id);
	}
});
