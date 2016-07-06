import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Comments } from '../collections/comments.js'
import { Posts } from '../collections/blogPosts.js'

PostsIndex = new EasySearch.Index({
    collection: Posts,
    fields: ['title', 'text', 'comments'],
    defaultSearchOptions: {
      sortBy: 'date'
    },
    engine: new EasySearch.Minimongo({
      transform: function(doc){
        var newPosts = {};
        var newDate;
        newDate = moment(doc.date);
        var formattedDate = moment(newDate).format("M/D/YY");
        newPosts = {
            _id: doc._id,
            date: formattedDate,
            title: doc.title,
            text: doc.text,
            authorId: doc.authorId,
            comments: doc.comments
        };
        return newPosts;
      },
      sort: function (searchObject, options) {
          return {
            date: -1
          };
      }
    })
});

Template.post.onCreated(function(){
  Meteor.subscribe('Posts');
})

Template.writeComment.onCreated(function(){
  Meteor.subscribe('Posts')

})

/*
Template.comment.onCreated(function(){
  Meteor.subscribe('Comments');
});
*/

Template.createField.onCreated(function(){
  Meteor.subscribe('Posts');
});

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
