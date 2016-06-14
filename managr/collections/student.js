import { Mongo } from 'meteor/mongo';
Student = new Mongo.Collection('Student');

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
        type: [[]],
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
