import { Posts } from '../../collections/blogPosts.js';
Template.manage.helpers({
  'titles': function(){
    return Posts.find({authorId: Meteor.userId()}, { sort: { lastUpdated: -1 } });
  }
})

Template.manage.events({
  'click .manageDeleteButton': function(event){
    Modal.show("deletePost", event.target.id);
  }
});

Template.deletePost.events({
  'click .deletePostButton' : function(event){
    Meteor.call('delPost', Template.instance().data);
  }
});
