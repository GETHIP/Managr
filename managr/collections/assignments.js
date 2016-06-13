import { Mongo } from 'meteor/mongo';
export const Assignments = new Mongo.Collection('Assignments');
AssignmentSchema = new SimpleSchema({
    title: {
        type: String,
        label: "Title"
    },
    description: {
        type: String,
        label: "Description"
    },
    dueDate: {
        type: Date,
        label: "Due Date",
        autoValue: function() {
          // Adds a week in milliseconds
          return new Date() + 604800000;
        }
    },
    assigner: {
        type: String,
        label: "Assigner"
    },
    assignedStudents: {
        type: String,
        label: "Assigned Students"
    },
    dateAssigned: {
        type: Date,
        label: "Date Assigned",
        autoValue: function() {
            return new Date();
        }
    },
    pointsPossible: {
        type: Number,
        label: "Points Possible",
        autoValue: function() {
            return 10;
        }
    }
});
Assignments.attachSchema(AssignmentSchema);

// db.Assignments.insert([{title:"Bubble Sort Algorithm",description:"Write a Java algorithm that sorts random elements using the bubble sort method.",dueDate:new Date(),assigner:"abc",assignedStudents:["abcd","abcde","abcdef"],dateAssigned:new Date(),pointsPossible:100},{title:"Radix Sort Algorithm",description:"Write a Java algorithm that sorts random elements using the radix sort method",dueDate:new Date(),assigner:"abcdefg",assignedStudents:["abcdefgh","abcdefghi","abcdefghij","abcdefghijk"],dateAssigned:new Date(),pointsPossible:140},{title:"Navigation Bar Design",description:"Create a simple navigation bar with at least 5 links.",dueDate:new Date(),assigner:"abcdefghijkl",assignedStudents:["abcdefghijklm","abcdefghijklmn","abcdefghijklmno","abcdefghijklmnop","abcdefghijklmnopq"],dateAssigned:new Date(),pointsPossible:65}]);
