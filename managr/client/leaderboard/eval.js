Template.eval.helpers({
	eval: function(){
    return Eval.find({_id: FlowRouter.getParam("id")});
  }
});

Template.leaderboard.events({
  'click .delBtn': function(event){
    event.preventDefault();
    console.log("its clicking");
  },
  'click .updateBtn': function(event){

  }
});
