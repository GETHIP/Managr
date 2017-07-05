Template.deleteMilestoneModal.events({

	"click #confirmDeleteEditEval"(event) {
		event.preventDefault();
		var evalId = FlowRouter.getParam("id");
		Meteor.call('removeMilestone', milestoneId);
		FlowRouter.go("/dashboard");
	}

});

/*Template.deleteMilestoneModal.events({

	"click #deleteMilestoneButton"(event) {
		event.preventDefault();
		var evalId = FlowRouter.getParam("id");
		Meteor.call('removeMilestone', miletoneId);
		FlowRouter.go("/viewMilestone");
	}

});
*/
