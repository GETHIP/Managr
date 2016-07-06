import {getPosts, formatDatesOfPosts} from './blogContent.js'

Template.archives.helpers({
  //Returns Posts by Jim for non-logins
  publicPosts: function() {
      return formatDatesOfPosts(getPosts()); //Set ID to Jim's Id (Always Public Posts)
  },
  getHeader: function(){
    var year = FlowRouter.getParam("year");
    var month = FlowRouter.getParam("month");
    return month + " " + year;
  }
});
