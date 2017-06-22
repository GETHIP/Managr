import { Mongo } from 'meteor/mongo';

export const Questions = new Mongo.Collection('Questions');

QuestionSchema = new SimpleSchema({
  questionType: {
    type: String
  },
  countNumber: {
    type: Number,
    optional: true
  },
  prompt: {
    type: String
  },
  options: {
    type: [String],
    optional: true
  }
});

Questions.attachSchema(QuestionSchema);
