import { Mongo } from 'meteor/mongo';

export const Questions = new Mongo.Collection('Questions');

QuestionSchema = new SimpleSchema({
  questionType: {
    type: String
  },
  prompt: {
    type: String
  },
  options: {
    type: [String]
  }
});

Questions.attachSchema(QuestionSchema);
