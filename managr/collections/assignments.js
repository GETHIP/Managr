// Importing mongo for the creation of a collection Assignments
import { Mongo } from 'meteor/mongo';

// An exported constant Mongo Collection object Assigments
export const Assignments = new Mongo.Collection('Assignments');

// A constant of the number of milliseconds in a week (60 * 60 * 24 * 7 * 1000)
const milliseconds = 604800000;

Assignments.allow({
  insert: function() {
    return true;
  }
});

// A schema that acts as the required data type format for the Assignments collection
AssignmentSchema = new SimpleSchema({
    // Assignments title
    title: {
        type: String,
        label: "Title",
        optional: false
    },
    // Assignment description
    description: {
        type: String,
        label: "Description",
        optional: false
    },
    // Date assignment is due
    dueDate: {
        type: Date,
        label: "Due Date",
        optional: false
        /*autoValue: function() {
            // A week ahead of today by default
            return new Date() + milliseconds;
        }*/
    },
    // Instructor that assigned the assignment
    assigner: {
        type: String,
        label: "Assigner",
        autoform: {
            type: 'hidden'
        },
        optional:false
    },
    // Date the assignment was created
    dateAssigned: {
        type: Date,
        label: "Date Assigned",
        autoform: {
            type:'hidden'
        },
        autoValue: function() {
            // Automatically set to today
            return new Date();
        },
        optional: true
    },
    // Points the assignment is worth
    pointsPossible: {
        type: Number,
        label: "Points Possible",
        autoValue: function() {
            return 10;
        },
        optional: false
    }
});

// Binding the rules of the schema to the Assignments collection
Assignments.attachSchema(AssignmentSchema);

// TEST DATA
// db.Assignments.insert([{title:"Bubble Sort Algorithm",description:"Write a Java algorithm that sorts random elements using the bubble sort method.",dueDate:new Date(),assigner:"abc",assignedStudents:["abcd","abcde","abcdef"],dateAssigned:new Date(),pointsPossible:100},{title:"Radix Sort Algorithm",description:"Write a Java algorithm that sorts random elements using the radix sort method",dueDate:new Date(),assigner:"abcdefg",assignedStudents:["abcdefgh","abcdefghi","abcdefghij","abcdefghijk"],dateAssigned:new Date(),pointsPossible:140},{title:"Navigation Bar Design",description:"Create a simple navigation bar with at least 5 links.",dueDate:new Date(),assigner:"abcdefghijkl",assignedStudents:["abcdefghijklm","abcdefghijklmn","abcdefghijklmno","abcdefghijklmnop","abcdefghijklmnopq"],dateAssigned:new Date(),pointsPossible:65}]);
