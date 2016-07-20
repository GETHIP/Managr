import { Template } from 'meteor/templating';

Template.topNav.onCreated(function() {
	console.log("created topNav");
});
Template.topNav.onRendered(function() {
	console.log("rendered topNav");
});

Template.topNav.helpers({
	activeClass(group) {
		if (FlowRouter.current().route.group.name == group) {
			return "active " + group + "Active";
		} else {
			return "";
		}
	}
});
