import { Posts } from '../../collections/blogPosts.js';
var id: "2ZMjNPiNs85A4Fq48";
Template.writeComment.events({
  'submit .submitComment': function(event){
    console.log( event.target.name.value);
    console.log(event.target.comment.value);
    Meteor.call("updateComment", event.target.name.value, event.target.comment.value);
    }
  });
