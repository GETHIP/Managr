Template.archiveStudentModal.helpers({
	"lowercaseText":function() {
		return Template.instance().data.lowercaseText;
	},
	"uppercaseText":function() {
		return Template.instance().data.uppercaseText;
	},
	"username":function() {
		return Template.instance().data.username;
	}
});

Template.archiveStudentModal.events({
  'click .deleteCommentButton': function(event){
    Meteor.call("archiveStudent", Template.instance().data._id, Template.instance().data.isArchived);
  }
})
