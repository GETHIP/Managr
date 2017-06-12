import {
    Posts
} from '../../collections/blogPosts.js'


Template.sideNav.onCreated(function() {
    Meteor.subscribe("Posts");
});

function sortDates(){

}

  function checkCurrnet(archives, dateString){
    for (var i = 0; i < archives.length; i++) {
    if(archives[i].date == dateString){
      return true;
      }
    }
    return false;
  }

Template.sideNav.helpers({
  months: function(){
    var posts = Posts.find({}, { sort: {date: -1} }).fetch();
    var archives = [];
    var pulledDates = [];
    var i = 0;
    for (i = 0; i < posts.length; i++) {
      var dateString = moment(posts[i].date).format("MMMM YYYY");
    if(archives.length > 0){
      if(checkCurrnet(archives, dateString) == false){
       archives.push({date: dateString, url:moment(posts[i].date).format("YYYY/MMMM")});
     }
   }else{
       archives.push({date: dateString, url:moment(posts[i].date).format("YYYY/MMMM")});
    }
    }
      return archives;
  },
  recentComments: function(){
    var comments = [];
    return [];
  },
  recentPosts: function(){

    return Posts.find({}, { sort: {date: -1} }).fetch().slice(0, 5);
  },
  archives: function(){
    Posts.find().fetch()
  },
});

Template.sideNav.events({
    //For click events on side navbar
    'click #createPostButton': function(event, template) {
        event.preventDefault();
        FlowRouter.go('/home/createPost');
    }
});

Template.sideNav.events({
  'click #editPostButton': function(event, template) {
    event.preventDefault();
    FlowRouter.go('/home/managePosts');
  }
});
