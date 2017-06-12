export const Eval = new Mongo.Collection('Eval');

var EvalSchema = new SimpleSchema({
    Evaluator: {
        type: String,
        label: 'Evaluator'
    },
    Evaluatee: {
        type: String,
        label: "Evaluatee"
    },
    Message: {
        type: String,
        label: 'Message'
    },
    Stars : {
        type: Number,
        label: 'Stars'
    },
  Week: {
    type: Number,
    label: "Week"
  }
});
Eval.attachSchema(EvalSchema);
