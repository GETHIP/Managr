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
question = new SimpleSchema({
	type: {
		type: String
	},
	prompt: {
		type: String
	},
	answers: {
		type: [String]
	}
});
Surveys.schema = new SimpleSchema({
    title: {
        type: String,
        optional: false
    },
    dueDate: {
        type: Date,
        optional: false
    },
    studentsCompleted: {
        type: Number,
        optional: true
    },
    studentsAssigned: {
        type: [String],
        optional: false
    },
<<<<<<< HEAD
    questions: {
      type: [question]
=======
		surveyId: {
				type: String,
				optional: true
		},
    question: {
      	type: [question]
>>>>>>> eeb7cefec733718e49effeaa0fece78dfc4ab806
    }

});

Surveys.attachSchema(Surveys.schema);
