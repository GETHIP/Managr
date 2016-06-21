import { Posts } from '../../collections/blogPosts.js';

import { Template } from 'meteor/templating';
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
			title: "Title",
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
  /*
  Meteor.call('insertPost', {
    title:"Title",
    text:"This is the text of the post.",
    authorId:"jimsId",
    date:new Date (),
    comments: [
      {
        text:"This is the text of the comment.",
        authorId:"jimsId",
        date:new Date (),
      }
    ]
  });
  Meteor.call('insertPost', {
    title:"Different Title",
    text:"This is what I want to talk about.",
    authorId:"MCsId",
    date:new Date (),
    comments: []
  });
  Meteor.call('insertPost', {
    title:"My Title",
    text:"Hi There.",
    authorId:"AndrewsId",
    date:new Date (),
    comments: [
      {
        text:"Here is my comment.",
        authorId:"AndrewsId",
        date:new Date (),
      }
    ]
  });
  Meteor.call('insertPost', {
    title:"Title Again",
    text:"How's it going?",
    authorId:"PatricksId",
    date:new Date (),
    comments: [
      {
        text:"It's going good.",
        authorId:"jimsId",
        date:new Date (),
      }
    ]
  });
  Meteor.call('insertPost', {
    title:"My Post",
    text:"I want some pizza.",
    authorId:"jimsId",
    date:new Date (),
    comments: []
  });
  */
  }
})
