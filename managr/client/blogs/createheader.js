Template.createHeader.helpers({
	'headType': function(){
			if(FlowRouter.getRouteName() == "editDraft"){
				return "Edit Draft";
			}else{
				return "Create A Post";
			}
	}
});
