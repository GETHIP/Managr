Template.warningModal.helpers({
	"title":function() {
		return Template.instance().data.title;
	},
	"text":function() {
		return Template.instance().data.text;
	},
	"confirmText":function() {
		return Template.instance().data.confirmText;
	}
});

Template.warningModal.events({
	'click .deleteCommentButton': function(event){
		Template.instance().data.confirmCallback(Template.instance().data.callbackData);
	}
})
