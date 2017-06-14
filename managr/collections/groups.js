import { Mongo } from 'meteor/mongo';

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
        optional: true
    },
    leader: {
        type: String,
        label: "Leader",
        defaultValue: "",
        optional: true
    },
    size: {
        type: Number,
        label: "Size",
        optional: true
    },
    stringSize: {
        type: String,
        label: "String Size",
        optional: true
    },
    studentNames: {
        type: [String],
        label: "Student Names",
        optional: true
    },
    // Stores date as a number (number of milliseconds since 1970)
    dateCreated: {
        type: Number,
        label: "Date Created",
        optional: true
    }
});

Groups.attachSchema(GroupSchema);
