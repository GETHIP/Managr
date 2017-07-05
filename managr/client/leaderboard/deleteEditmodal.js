Template.deleteEditModal.events({

	"click #confirmDeleteEditEval"(event) {
		event.preventDefault();
		var evalId = FlowRouter.getParam("id");
		Meteor.call('removeEval', evalId);
		FlowRouter.go("/viewEval");
	}

});
