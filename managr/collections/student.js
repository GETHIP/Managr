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

var Address = new SimpleSchema({
    street: {
        type: String,
        label: 'Address'
    },
    city: {
        type: String,
        label: 'City'
    },
    state: {
        type: String,
        label: 'String'
    },
    zipCode: {
        type: Number,
        label: 'Zip Code'
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
        type: String,
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
    },
    phoneNumber: {
        type: Number,
        label: 'Phone Number'
    },
    parentNames: {
        type: [String],
        label: 'Parent\'s Phone Numbers'
    },
    address: {
        type: Address,
        label: 'Home Address'
    },
    github: {
        type: String, //The string can be their user name. Using that we can generate a URL to their github profile
        label: 'Github'
    },
    tshirtSize:{
        type: String,
        label: 'tshirtSize'
    },
    blog: {
        type: String,
        label: "Blog"
    }
});
Student.attachSchema(StudentSchema);
