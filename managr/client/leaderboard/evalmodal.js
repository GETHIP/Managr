Template.deleteEvalModal.events({

	"click #confirmDeleteEval"(event) {
		event.preventDefault();
		var evalId = FlowRouter.getParam("id");
		Meteor.call('removeEval', evalId);
		FlowRouter.go("/viewEval");
	}

});
