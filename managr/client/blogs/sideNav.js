import { Comments } from '../collections/comments.js'

var commentDisplays = 5;
var postDisplays = 5;

Template.sideNav.helpers({
  months: function(){
    //Return months with posts from mongo
  },
  recentComments: function(){
    var comments = [];
  return comments = Comments.find().sort({Date:1}).slice(0,commentDisplays-1);
  },
  recentPosts: function(){
    var posts = [];
    return comments = Posts.find().sort({Date:1}).slice(0,commentDisplays-1);
  },
  }
});
