Template.accessDenied.onCreated(function() {
	Template.instance().ready = new ReactiveVar(false);
	var inst = Template.instance();
	Meteor.subscribe("dummyUsers", {
		onReady: function() {
			console.log("Ready");
			inst.ready.set(true);
		}
	});
});
Template.accessDenied.helpers({
	ready: function() {
		return Template.instance().ready.get();
	}
});