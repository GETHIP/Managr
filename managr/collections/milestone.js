export const Milestone = new Mongo.Collection('Milestone');

var MileStoneSchema = new SimpleSchema({
    name: {
        type: String,
        label: 'Name'
    },
    date: {
      type: Date,
      autoValue: function() {
        return new Date();
      }
    }
});

Instructor.attachSchema(MileStoneSchema);
