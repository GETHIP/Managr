import { Posts } from '../../collections/blogPosts.js';

import { Template } from 'meteor/templating';
Template.testInsertData.events({
  'click .testClass':function(e) {

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
  }
})
