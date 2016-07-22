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
            dueDate: (assignment.dueDate.getMonth() + 1) + "/" + assignment.dueDate.getDate() + "/" +  assignment.dueDate.getFullYear(),
            assigner: assignment.assigner,
            dateAssigned: (assignment.dateAssigned.getMonth() + 1) + "/" + assignment.dateAssigned.getDate() + "/" +  assignment.dateAssigned.getFullYear(),
            pointsPossible: assignment.pointsPossible
        }
        return formattedAssignment;
    }
});
