export const Posts = new Mongo.Collection('Posts');


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
