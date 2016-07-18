Template.viewAllAssignTable.onCreated(function() {
  Meteor.subscribe('Assignments');
});

Template.viewAllAssignTable.helpers({
    assignments: function() {
        var formattedAssignments, allAssignments, i;
        formattedAssignments = [];

        allAssignments = Assignments.find({}).fetch();
        for (i = 0; i < allAssignments.length; i++) {
            var assignment, assignmentUrl, formattedAssignment;
            assignment = allAssignments[i];
            assignmentUrl = "/assignments/single/admin/" + assignment._id.valueOf();
            // The formatted object to be returned
            formattedAssignment = {
                title: assignment.title,
                url: assignmentUrl
            }
            formattedAssignments.push(formattedAssignment);
        }
        return formattedAssignments;
    }
});

// Provides the assignment data to the single template from Assignments collection
/*Template.viewAllAssignTable.events({
  'click #newAssignmentBtn'(event){
    FlowRouter.go("/assignments/edit/new");
  },
	'click #viewGradesBtn'(event) {
		FlowRouter.go('/assignments/grades');
	}
});*/
