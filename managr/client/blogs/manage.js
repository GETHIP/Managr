import { Posts } from '../../collections/blogPosts.js';
Template.manage.helpers({
  'titles': function(){

    return Posts.find({authorId: Meteor.userId()});
  }
})
