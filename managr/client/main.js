import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Comments } from '../collections/comments.js'

Template.post.onCreated(function(){
  Meteor.subscribe('Posts');
})

Template.writeComment.onCreated(function(){
  Meteor.subscribe('Posts')

})
/*
Template.comment.onCreated(function(){
  // Meteor.subscribe('Comments');
});
*/
Template.post.events({

});
/*
var d1 = new Date("2015-01-31");
var d2 = new Date("2015-02-16");
var d3 = new Date("2015-03-1");
console.log(d1 + " < " + d2 + " = " + (d1 < d2));
console.log(d1 + " < " + d3 + " = " + (d1 < d3));
console.log(d2 + " < " + d3 + " = " + (d2 < d3));
*/
