import { Posts } from '../../collections/blogPosts.js';

export function formatDatesOfPosts(posts) {
    var newPosts = [];
    var newDate;
    var i;
    for (i = 0; i < posts.length; i++) {
        newDate = moment(posts[i].date);
        var formattedDate = moment(newDate).format("M/D/YY");
        newPosts.push({
            _id: posts[i]._id,
            date: formattedDate,
            title: posts[i].title,
            text: posts[i].text,
            authorId: posts[i].authorId,
            comments: posts[i].comments,
        });
    }
    return newPosts;
}

function getPosts() {
    var year = FlowRouter.getParam("year");
    var month = FlowRouter.getParam("month");
    if (year == undefined) {
        return Posts.find().fetch();
    }
    var posts = Posts.find().sort({'date': -1}).fetch();
    var validPosts = [];
    var i = 0;
    for (i = 0; i < posts.length; i++) {
        var nameOfMonth = moment(posts[i].date).format("MMMM");
        var nameOfYear = moment(posts[i].date).format("YYYY");
        console.log(nameOfYear);
        console.log(year);
        if (year == nameOfYear && month == nameOfMonth) {
            validPosts.push(posts[i]);
        }
    }
    return validPosts;
}

Template.blogContent.helpers({

    //Returns Posts by Jim for non-logins
    publicPosts: function() {

        return formatDatesOfPosts(Posts.find({
            authorId: {
                $eq: 1
            }
        })); //Set ID to Jim's Id (Always Public Posts)
    },
    //Returns all Blog Posts
    postsIndex: function() {
        return formatDatesOfPosts(getPosts());
    },

    postsIndex() {
      var post = Posts.find({}, {
        sort: {'date': -1}
      }).fetch();
      console.log("Hello");
      return post;
    }
});
