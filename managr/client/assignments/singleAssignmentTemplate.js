Template.singleAssignmentTemplate.onCreated(function() {
  Meteor.subscribe('Assignments');
});

Template.singleAssignmentTemplate.helpers({
    assignments: function() {
        var assignment = Assignments.findOne({_id: FlowRouter.getParam("id")});

        var formattedAssignment;
        formattedAssignment = {
            title: assignment.title,
            description: assignment.description,
            // dueDate: assignment.dueDate.getMonth() + "/" + assignment.dueDate.getDate() + "/" +  assignment.dueDate.getFullYear(),
            dueDate: moment(assignment.dueDate).format("MM/DD/YYYY"),
			assigner: assignment.assigner,
            // dateAssigned: assignment.dateAssigned.getMonth() + "/" + assignment.dateAssigned.getDate() + "/" +  assignment.dateAssigned.getFullYear(),
            dateAssigned: moment(assignment.dateAssigned).format("MM/DD/YYYY"),
			pointsPossible: assignment.pointsPossible
        }
        return formattedAssignment;
    }
});
