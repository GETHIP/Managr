import { Posts } from '../../collections/blogPosts.js';
Template.manage.helpers({
  'titles': function(){
    return Posts.find({authorId: Meteor.userId()});
  }
})

Template.manage.events({
  'click .manageDeleteButton': function(event){
    Meteor.call('delPost', event.target.id);
  }
});
