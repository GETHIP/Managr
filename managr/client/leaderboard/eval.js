import { Eval } from '../../collections/eval.js'

Template.leaderboard.onCreated(function(){
  Meteor.subscribe('Eval');
});

Template.eval.helpers({
	eval: function(){
    return Eval.find({_id: FlowRouter.getParam("id")});
  },
	effort: function(element){
		var starRating = Eval.find({evaluatee: element._id}).fetch();
		console.log(starRating);
		var starRating = starRating[0].stars;
		var effort = eval(starRating[0]);
		console.log(effort)
		return effort;
	},
	attitude: function(element){
		var starRating = Eval.find({evaluatee: element._id}).fetch();
		var starRating = starRating[0].stars;
		var attitude= eval(starRating[1]);
		return attitude;
	},
	teamwork: function(element){
		var starRating = Eval.find({evaluatee: element._id}).fetch();
		var starRating = starRating[0].stars;
		var teamwork = eval(starRating[2]);
		return teamwork;
	}
});

Template.leaderboard.events({
  'click .delBtn': function(event){
    event.preventDefault();
  },
  'click .updateBtn': function(event){

  }
});
