import { Mongo } from 'meteor/mongo';
import { StudentSchema } from '/collections/student.js';

export const Groups = new Mongo.Collection('Groups');

GroupSchema = new SimpleSchema({
    name: {
        type: String,
        label: "Group Name",
        optional: false
    },
    studentIds: {
        type: [String],
        label: "Student IDs",
        defaultValue: [],
        optional: true
    },
    coaches: {
        type: [String],
        label: "Coaches",
        defaultValue: [],
        optional: true
    },
    coachNames: {
        type: [String],
        label: "Coach Names",
        defaultValue: [],
        optional: true
    },
    size: {
        type: Number,
        label: "Size",
        defaultValue: 0,
        optional: true
    },
    stringSize: {
        type: String,
        label: "String Size",
        defaultValue: "0",
        optional: true
    },
    studentNames: {
        type: [String],
        label: "Student Names",
        defaultValue: [],
        optional: true
    },
    // Stores date as a number (number of milliseconds since 1970)
    dateCreated: {
        type: Number,
        label: "Date Created",
        optional: true
    },
    groupType: {
        type: String,
        label: "Type",
        optional: true
    }
    // groupStudents: {
    //     type: [StudentSchema],
    //     label: "Students",
    //     defaultValue: [],
    //     optional: true
    // }
});

Groups.attachSchema(GroupSchema);
