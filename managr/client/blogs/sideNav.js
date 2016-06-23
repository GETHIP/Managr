import { Posts } from '../../collections/blogPosts.js'


Template.sideNav.onCreated(function(){
  Meteor.subscribe("Posts");
});


var commentDisplays = 5;
var postDisplays = 5;

Template.sideNav.helpers({
  months: function(){
    var posts = Posts.find().fetch();
    var archives = [];
    var i = 0;
    for (i = 0; i < posts.length; i++) {

    }
    //Return months with posts from mongo
  },
  recentComments: function(){
    var comments = [];
    return [];
  },
  recentPosts: function(){

    return Posts.find().fetch().slice(0, postDisplays);
  },
  archives: function(){
    Posts.find().fetch()
  },
});

Template.sideNav.events({
  //For click events on side navbar

});
