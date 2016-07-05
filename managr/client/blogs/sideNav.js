import {
    Posts
} from '../../collections/blogPosts.js'


Template.sideNav.onCreated(function() {
    Meteor.subscribe("Posts");
});

function sortDates(){

}

var commentDisplays = 5;
var postDisplays = 5;

Template.sideNav.helpers({
    months: function() {
        var posts = Posts.find().fetch();
        var archives = [];
        var i = 0;
        for (i = 0; i < posts.length; i++) {
            var dateString = moment(posts[i].date).format("MMMM YYYY");
            if (!archives.includes(dateString)) {
                archives.push({
                    date: dateString,
                    url: moment(posts[i].date).format("YYYY/MMMM")
                });
            }
        }

        // /2016/February

        //Return months with posts from mongo
        return archives;
    },

    recentComments: function() {
        var comments = [];
        return [];
    },
    recentPosts: function() {

        return Posts.find().fetch().slice(0, postDisplays);
    },
    archives: function() {
        Posts.find().fetch()
    },
});

Template.sideNav.events({
    //For click events on side navbar
    'click #createPostButton': function(event, template) {
        event.preventDefault();
        FlowRouter.go('/createPost');
    }
});
