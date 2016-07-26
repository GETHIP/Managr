import { Posts } from '../../collections/blogPosts.js';
import { Drafts } from '../../collections/drafts.js';

Template.manage.onCreated(function(){
  Meteor.subscribe("Drafts");
});

Template.manage.helpers({
  'titles': function(){
    return Posts.find({authorId: Meteor.userId()}, { sort: { lastUpdated: -1 } });
  },
  'drafts': function(){
    console.log( Drafts.find());
    console.log(Meteor.userId());
    return Drafts.find({authorId: Meteor.userId()}, { sort: { lastUpdated: -1 } });
  }
});

Template.manage.events({
  'click .manageDeleteButton': function(event){
    Modal.show("deletePost", event.target.id);
  },
  'click .manageDraftDeleteButton': function(event){
    Modal.show('deleteDraft', event.target.id);
   }
});
