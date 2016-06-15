import { Mongo } from 'meteor/mongo';
Student = new Mongo.Collection('Student');

var AssignmentsSchema = new SimpleSchema({
    name: {
        type: String,
        label: 'Name'
    },
    dateAssigned: {
        type: Date,
        label: 'Date'
    },
    dueDate: {
        type: Date,
        label: 'Due Date'
    },
    possiblePoints: {
        type: Number,
        label: 'Possible Points'
    },
    pointsRecieved: {
        type: Number,
        label: 'Points Recieved'
    },
    instructor: {
        type: String,
        label: 'Instructor'
    }
});

var StudentSchema = new SimpleSchema({
    name: {
        type: String,
        label: 'Name'
    },
    profilePicture: {
        type: String,
        label: 'Profile Picture'
    },
    age: {
        type: Number,
        label: 'Age'
    },
    strengths: {
        type: [String],
        label: 'Strengths'
    },
    description: {
        type: String,
        label: 'Description'
    },
    grade: {
        type: [String],
        label: 'Grade'
    },
    attendance: {
        type: [Boolean],
        label: 'Attendance'
    },
    assignments: {
        type: [AssignmentsSchema],
        label: 'Assignments'
    },
    school: {
        type: String,
        label: 'School'
    },
    email: {
        type: String,
        label: 'Email'
    },
    getHipYear: {
        type: Number,
        label: 'Get Hip Year'
    }
});
Student.attachSchema(StudentSchema);
