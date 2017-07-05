Template.submitEvalModal.events({

	"click #confirmSubmitEval"(event) {
		event.preventDefault();
		var evalId = FlowRouter.getParam("id");
		Meteor.call('sendEval', evalId);
		FlowRouter.go("/viewEval");
	}

});
