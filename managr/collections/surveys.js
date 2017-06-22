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

option = new SimpleSchema({
	text: {
		type: String
	},
	controlType: {
		type: String
	}
});

question = new SimpleSchema({
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

SurveySchema = new SimpleSchema({
    name: {
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
    questions: {
      type: [question]
		},
		surveyId: {
				type: String,
				optional: true
		},
});

Surveys.attachSchema(SurveySchema);
