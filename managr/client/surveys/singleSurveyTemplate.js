//Needs editing, this is just the basic outline for the template js
Template.singleSurveyTemplate.onCreated(function() {
  Meteor.subscribe('Surveys');
});

Template.singleSurveyTemplate.helpers({
    assignments: function() {
        var survey = Surveys.findOne({_id: FlowRouter.getParam("id")});

        var formattedSurvey;
        formattedSurvey = {
            title: survey.title,
            // dueDate: survey.dueDate.getMonth() + "/" + survey.dueDate.getDate() + "/" +  survey.dueDate.getFullYear(),
            dueDate: moment(survey.dueDate).format("MM/DD/YYYY")
        }
        return formattedSurvey;
    }
});
