import { Posts } from '../../collections/blogPosts.js';
import { Template } from 'meteor/templating';

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});

Template.testInsertData.events({
	'click .testClass':function(e) {
		var i = 0;
		var dates = [
			new Date(2016, 1, 1),
			new Date(2016, 2, 1),
			new Date(2016, 3, 1),
			new Date(2015, 1, 1),
			new Date(2015, 2, 1),
			new Date(2015, 3, 1),
			new Date(2014, 1, 1),
			new Date(2014, 2, 1),
			new Date(2014, 3, 1),
			new Date(2013, 1, 1)
		];
		for (i = 1; i <= 10; i++) {
			Meteor.call('insertPost', {
				title: "Title " + i,
				text: "Text of the blog post.\n\n\n\nEnd of blog post.",
				authorId: "jimsId",
				date: dates[i - 1],
				comments: [
					{
						text: "Comment.",
						authorId: "otherId",
						date: dates[i - 1]
					}
				]
			});
		}
	},
	'click .createUsers': function(e) {
		Meteor.call('testCreateUsers');
	}
});
