import { Eval } from '../../collections/evals.js';





Template.EvalsPage.events({
	'click .submit':function(event) {
    var eAid = Meteor.user()._id;
    var eId;
    var comment;
    Meteor.call("sendEval", eAid, eId, comment);

}});
