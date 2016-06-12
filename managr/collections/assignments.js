import { Mongo } from 'meteor/mongo';
Assignments = new Mongo.Collection('Assignments');
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
            return new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000);
        }
    },
    assigner: {
        type: String,
        label: "Assigner"
    },
    assignedStudents: {
        type: [Number],
        label: "Assigned Students"
    },
    dateAssigned: {
        type: String,
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
/*
[{title:"Bubble Sort Algorithm",description:"Write a Java algorithm that sorts random elements using the bubble sort method.",dueDate:new Date(),assigner:"Zach Merril",assignedStudents:[0,3,7,15,37,86],dateAssigned:new Date(),pointsPossible:100},{title:"Radix Sort Algorithm",description:"Write a Java algorithm that sorts random elements using the radix sort method",dueDate:new Date(),assigner:"James Getrost",assignedStudents:[0,1,2,3,4,5,6,7,10],dateAssigned:new Date(),pointsPossible:140},{title:"Navigation Bar Design",description:"Create a simple navigation bar with at least 5 links.",dueDate:new Date(),assigner:"Melanie Powell",assignedStudents:[2,4,6,9,12,15,27,29,30,37],dateAssigned:new Date(),pointsPossible:65}]
*/
