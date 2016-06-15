import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Comments } from '../collections/comments.js'

Template.post.onCreated(function(){
  Meteor.subscribe('Posts');
})

Template.post.events({

});
