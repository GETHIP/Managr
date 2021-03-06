export const Posts = new Mongo.Collection('Posts');

Comment = new SimpleSchema({
    text: {
        type: String,
        label: "Text"
    },
    authorId: {
        type: String,
    },
	authorName: {
		type: String
	},
    date: {
      type: Date,
      autoValue: function() {
  			return new Date();
  		}
    },

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
	authorName: {
		type: String,
	},
    date: {
      type: Date,
      defaultValue: function() {
  			return new Date();
  		}
    },
	lastUpdated: {
		type: Date
	},
    comments: {
      type: [Comment]
    },
    isPublic: {
      type: Boolean,
    }
});

Posts.attachSchema(postSchema);
