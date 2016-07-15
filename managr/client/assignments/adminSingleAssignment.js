Template.adminSingleAssignment.onCreated(function() {
	Meteor.subscribe('Assignments');
});

Template.adminSingleAssignment.events({
	'click #modassign'(event) {
		event.preventDefault();
		var id = FlowRouter.getParam("id");
		FlowRouter.go("/assignments/edit/single/admin/" + id);
	}
});
