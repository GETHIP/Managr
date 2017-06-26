Template.deleteQuestion.events({
  'click .deleteQuestionButton' : function(event){
    event.preventDefault();
    console.log(Template.instance().data._id);
    Meteor.call("removeQuestion", Template.instance().data._id);
  }
});
