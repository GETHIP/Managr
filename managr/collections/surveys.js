import { Mongo } from 'meteor/mongo';

export const Surveys = new Mongo.Collection('Surveys');

/*(Assignments.allow({
  insert: function(userId, doc) {
    if(Meteor.user.findOne({_id: userId})._id ===  Meteor.user()._id) {
      return true;
    }
    return false;
  },
  update: function(userId, doc) {
    return true;
  },
  remove: function(userId, doc) {
    return true;
  }
});*/
surveySchema = new SimpleSchema({
    title: {
        type: String,
        label: "Title",
        optional: false
    },
    description: {
        type: String,
        label: "Description",
        optional: false
    },
    dueDate: {
        type: Date,
        label: "Due Date",
        optional: false
    },
    assigner: {
        type: String,
        label: "Assigner",
        autoform: {
            type: "hidden"
        },
        optional:false
    },
    dateAssigned: {
        type: Date,
        label: "Date Assigned",
        autoform: {
            type: "hidden"
        },
        autoValue: function() {
            // Automatically set to today
            var today = new Date();
            return today;
        },
        optional: true
    },
});

Surveys.attachSchema(surveySchema);
