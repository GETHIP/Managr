Template.mainPage.helpers({
	renderNavbar() {
		return (Meteor.user() != null) || FlowRouter.current().path == "/login";
	}
});