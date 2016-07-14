Template.adminSingleAssignment.onCreated(function() {
	Meteor.subscribe('Assignments');
});

Template.adminSingleAssignment.events({
	'click #modassign'(event) {
		event.preventDefault();
		var id = FlowRouter.getParam("id");
		window.location = "/assignments/edit/single/admin/" + id;
	}
});
