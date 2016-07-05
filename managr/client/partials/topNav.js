import { Template } from 'meteor/templating';

Template.topNav.helpers({
	activeClass(group) {
		console.log("Checking " + group + "...");
		if (FlowRouter.current().route.group.name == group) {
			return "active " + group + "Active";
		} else {
			return "";
		}
	}
});