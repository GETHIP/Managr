import { Posts } from '../../collections/blogPosts.js';
import { Template } from 'meteor/templating';
import { Accounts } from 'meteor/accounts-base';

Template.testInsertData.events({
	'click .testClass'(event) {
		Meteor.call('testCreatePosts');
    console.log("created");
	},
	'click .createUsers'(event) {
		Meteor.call('testCreateUsers');
	}
});
