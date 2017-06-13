import { Mongo } from 'meteor/mongo';
export const Student = new Mongo.Collection('Student');

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
        label: 'State'
    },
    zipCode: {
        type: Number,
        label: 'Zip Code',
        regEx: SimpleSchema.RegEx.ZipCode
    }
});

var Assignment = new SimpleSchema({
    assignmentId: {
        type: String,
        label: "Assignment ID"
    },
    pointsReceived: {
        type: Number,
        defaultValue: -1,
        decimal: true,
        label: "Points Received"
    },
    completed: {
      type: Boolean,
      defaultValue: false,
      label: "Completed"
    },
    link: {
      type: String,
      optional: true,
      label: "Link"
    }
});

var StudentSchema = new SimpleSchema({
    name: {
        type: String,
        label: 'Name'
    },
    age: {
        type: Number,
        label: 'Age'
    },
    stars: {
        type: Number,
        label:'Stars'
    },
    total: {
        type: Number,
        label: 'total'
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

    attendanceNumber: {
        type: Number,
        label:'AttendanceNumber'
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
        type: String,
        label: 'Phone Number'
    },
    parentNames: {
        type: [String],
        label: 'Parent\'s Names'
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
    },
    ep10: {
        type: [String],
        label: "EP10"
    },
	  userId: {
		    type: String,
		    label: 'userId'
	  },
    picture: {
        type: String,
        label: 'Profile Picture'
    },
    assignments: {
        type: [Assignment],
        label: "Assignments",
        optional: true
    },
	isArchived: {
		type: Boolean
	},
});
Student.attachSchema(StudentSchema);
