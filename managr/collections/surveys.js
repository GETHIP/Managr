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

    dueDate: {
        type: Date,
        label: "Due Date",
        optional: false
    },
    studentsCompleted: {
        type: Number,
        label: "Students Completed",
        optional: false
    },
    studentsAssigned: {
        type: Number,
        label: "Students Assigned",
        optional: false
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
