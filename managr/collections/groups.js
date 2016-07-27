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
    }
});

Groups.attachSchema(GroupSchema);
