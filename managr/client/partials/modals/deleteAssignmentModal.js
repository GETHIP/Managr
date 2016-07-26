Template.deleteAssignmentModal.events({

	"click #confirmDeleteAssignment"(event) {
		event.preventDefault();
		var assignmentId = FlowRouter.getParam("id");
		Meteor.call('removeAssignment', assignmentId);
		FlowRouter.go("/assignments");
	}

});
