import { Template } from 'meteor/templating';

Template.topNav.helpers({
	activeClass(group) {
		if (FlowRouter.current().route.group.name == group) {
			return "active " + group + "Active";
		} else {
			return "";
		}
	}
});