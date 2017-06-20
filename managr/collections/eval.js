export const Eval = new Mongo.Collection('Eval');

var EvalSchema = new SimpleSchema({
    evaluator: {
        type: String,
        label: 'Evaluator'
    },
    evaluatee: {
        type: String,
        label: "Evaluatee"
    },
    message: {
        type: String,
        label: 'Message'
    },
    stars : {
        type: [String],
        label: 'Stars'
    },
  week: {
    type: Number,
    label: "Week"
  },
  timeStamp: {
    label: "date",
    type: Date,
  }
});
Eval.attachSchema(EvalSchema);
