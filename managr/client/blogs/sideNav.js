import { Posts } from '../../collections/blogPosts.js'


Template.sideNav.onCreated(function(){
  Meteor.subscribe("Posts");
});


var commentDisplays = 5;
var postDisplays = 5;

Template.sideNav.helpers({
  months: function(){
    //Return months with posts from mongo
  },
  recentComments: function(){
    var comments = [];
    return [];
  },
  recentPosts: function(){

    return Posts.find().fetch().slice(0, postDisplays);
  },
});

Template.sideNav.events({
  //For click events on side navbar




});
