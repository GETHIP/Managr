import { Mongo } from 'meteor/mongo';

export const Assignments = new Mongo.Collection('Assignments');

Assignments.allow({
  insert: function() {
    return true;
  },
  update: function() {
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

// TEST DATA
// db.Assignments.insert([{title:"Bubble Sort Algorithm",description:"Write a Java algorithm that sorts random elements using the bubble sort method.",dueDate:new Date(),assigner:"abc",assignedStudents:["abcd","abcde","abcdef"],dateAssigned:new Date(),pointsPossible:100},{title:"Radix Sort Algorithm",description:"Write a Java algorithm that sorts random elements using the radix sort method",dueDate:new Date(),assigner:"abcdefg",assignedStudents:["abcdefgh","abcdefghi","abcdefghij","abcdefghijk"],dateAssigned:new Date(),pointsPossible:140},{title:"Navigation Bar Design",description:"Create a simple navigation bar with at least 5 links.",dueDate:new Date(),assigner:"abcdefghijkl",assignedStudents:["abcdefghijklm","abcdefghijklmn","abcdefghijklmno","abcdefghijklmnop","abcdefghijklmnopq"],dateAssigned:new Date(),pointsPossible:65}]);
