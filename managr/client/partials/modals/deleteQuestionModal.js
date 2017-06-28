Template.deleteQuestion.events({
  'click .deleteQuestionButton' : function(event){
    event.preventDefault();
    var surveyId = Template.instance().data.surveyId;
    var dateHash = Template.instance().data.dateHash;
    console.log("HERe");
    Meteor.call("removeQuestion", surveyId, dateHash);
  }
});
