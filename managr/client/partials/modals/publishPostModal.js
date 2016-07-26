Template.publishPost.events({
  'click #publish': function(e){
		e.preventDefault();
		Meteor.call("insertPost", Template.instance().data);
		if(FlowRouter.getRouteName() == "editDraft"){
			Meteor.call("delDraft", FlowRouter.getParam("draft_id"));
		}
		FlowRouter.go("/");
	},
	'click #publicCheck':function(e) {
		Template.instance().publicPost = !Template.instance().publicPost;
	}
});
