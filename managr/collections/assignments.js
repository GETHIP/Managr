import { Mongo } from 'meteor/mongo';

export const Assignments = new Mongo.Collection('Assignments');

Assignments.allow({
  insert: function() {
    return true;
  },
  update: function() {
    return true;
  },
  remove: function() {
    return true;
  }
});

Comment = new SimpleSchema({
    text: {
        type: String,
        label: "Text"
    },
    authorId: {
        type: String,
        label: "Author ID"
    },
	  authorName: {
		    type: String,
        label: "Author"
	  },
    dateCreated: {
        type: Date,
        autoValue: function() {
			      return new Date();
		    }
    }
});

AssignmentSchema = new SimpleSchema({
    title: {
        type: String,
        label: "Title",
        optional: false
    },
    description: {
        type: String,
        label: "Description",
        optional: false
    },
    dueDate: {
        type: Date,
        label: "Due Date",
        optional: false
    },
    assigner: {
        type: String,
        label: "Assigner",
        autoform: {
            type: "hidden"
        },
        optional:false
    },
    dateAssigned: {
        type: Date,
        label: "Date Assigned",
        autoform: {
            type: "hidden"
        },
        autoValue: function() {
            // Automatically set to today
            return new Date();
        },
        optional: true
    },
    pointsPossible: {
        type: Number,
        label: "Points Possible",
        optional: false
    },
    comments: {
      type: [Comment],
      label: "Comments",
      optional: true
    }
});

Assignments.attachSchema(AssignmentSchema);
