import { Posts } from '../../collections/blogPosts.js';
import { userIsValid } from './postPage.js';

export function formatDatesOfPosts(posts) {
    var newPosts = [];
    var newDate;
    var i;
    for (i = 0; i < posts.length; i++) {
        newDate = moment(posts[i].date);
        var formattedDate = moment(newDate).format("M/D/YY");
		var formattedUpdated = moment(posts[i].lastUpdated).format("M/D/YY");
        newPosts.push({
            _id: posts[i]._id,
            date: formattedDate,
			lastUpdated: formattedUpdated,
            title: posts[i].title,
            text: posts[i].text,
            authorId: posts[i].authorId,
			      authorName: posts[i].authorName,
            comments: posts[i].comments,
            isPublic: posts[i].isPublic
        });
    }
    return newPosts;
}

export function getPosts() {
    var year = FlowRouter.getParam("year");
    var month = FlowRouter.getParam("month");
    if (year == undefined) {
      var p = Posts.find().fetch();
      var s = p.sort((a, b) => {
        if (a < b) {
          return -1;
        } else if (a > b) {
          return 1;
        } else {
          return 0;
        }
      });
      return formatDatesOfPosts(s);
    }
    var posts = Posts.find({}, { sort: {'date': -1} }).fetch();

    var validPosts = [];
    var i = 0;
    for (i = 0; i < posts.length; i++) {
        var nameOfMonth = moment(posts[i].date).format("MMMM");
        var nameOfYear = moment(posts[i].date).format("YYYY");
        if (year == nameOfYear && month == nameOfMonth) {
            validPosts.push(posts[i]);
        }
    }
    return validPosts;
}

Template.blogContent.helpers({

    //Returns all Blog Posts
    postsIndex: function() {
      console.log("post index");
        return formatDatesOfPosts(getPosts());
    },


});

Template.searchBox.helpers({
  searchEngine: function() {
    var post = getPosts();
    console.log("Hello");
    return post;
  }
});
