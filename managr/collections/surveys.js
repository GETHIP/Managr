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
		type: String,
		optional: true
	},
	controlType: {
		type: String,
		optional: true
	}
});



studentAnswer = new SimpleSchema({
	studentId: {
		type: String
	},
	answer: {
		type: String
	},
	status: {
		type: Boolean,
		optional: true
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
		type: [String],
		optional: true
	},
	dateHash: {
		type: Number,
		optional: true
	},
	studentResults: {
		type: [studentAnswer],
		optional: true
	}
});

SurveySchema = new SimpleSchema({
    name: {
        type: String,
        optional: false
    },
    dueDate: {
        type: String,
        optional: true
    },
    studentsCompleted: {
        type: Number,
        optional: true
    },
    questions: {
			type: [question],
			defaultValue: [],
			optional: true
		},
		surveyId: {
				type: String,
				optional: true
		}
});

Surveys.attachSchema(SurveySchema);
