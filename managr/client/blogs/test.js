import { Posts } from '../../collections/blogPosts.js';
import { Template } from 'meteor/templating';
import { Accounts } from 'meteor/accounts-base';

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});

Template.testInsertData.events({
	'click .testClass':function(e) {
		Meteor.call('testCreatePosts');
	},
	'click .createUsers': function(e) {
		Meteor.call('testCreateUsers');
	}
})
