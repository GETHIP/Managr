import { Template } from 'meteor/templating';

Posts = new Mongo.Collection('Posts');

Comment = new SimpleSchema({
    text: {
        type: String,
        label: "Text"
    },
    authorId: {
        type: String,
    },
    date: {
      type: Date,
      autoValue: function() {
  			return new Date()
  		},
    }

});

postSchema = new SimpleSchema({
    title: {
        type: String,
        label: "Title"
    },
    text: {
        type: String,
        label: "Text"
    },
    authorId: {
        type: String,
    },
    date: {
      type: Date,
      autoValue: function() {
  			return new Date()
  		}
    },
    comments: {
      type: [Comment]
    }
});

Posts.attachSchema(postSchema);
