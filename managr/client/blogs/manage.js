import { Posts } from '../../collections/blogPosts.js';
import { Drafts } from '../../collections/drafts.js';

Template.manage.helpers({
  'titles': function(){
    return Posts.find({authorId: Meteor.userId()});
  },
  'drafts': function(){
    console.log( Drafts.find());
    console.log(Meteor.userId());
    return Drafts.find();
  }
})

Template.manage.onCreated(function(){
  Meteor.subscribe("Drafts");
});

Template.manage.events({
  'click .manageDeleteButton': function(event){
    Meteor.call('delPost', event.target.id);
  },
  'click .manageDraftDeleteButton': function(event){
    Meteor.call('delDraft', event.target.id);
    }
  });
