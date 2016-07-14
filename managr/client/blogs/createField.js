import { Posts } from '../../collections/blogPosts.js';

Template.createField.onCreated(function(){
  Meteor.subscribe('Posts');
});
