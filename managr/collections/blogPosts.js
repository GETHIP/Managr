import { Template } from 'meteor/templating';

export Posts = new Mongo.Collection('Posts');

postSchema = new SimpleSchema({
    title: {
        type: String,
        label: "Title"
    },
    text: {
        type: String,
        label: "Text"
    },
    author: {
        type: String,
    },
    date: {
      type: Date,
      autoValue: function() {
  			return new Date()
  		},
    }

});

Posts.attachSchema(postSchema);
