Template.studentsAllAssignments.onCreated(function() {
  Meteor.subscribe('Assignments');
});

// Provides the table template with all the listed assignments
Template.studentsAllAssignments.helpers({
    assignments: function() {
        var formattedAssignments, allAssignments, i;
        formattedAssignments = [];
        allAssignments = Assignments.find({}).fetch();
        for (i = 0; i < allAssignments.length; i++) {
            var assignment, j, aUrl, formattedAssignment;
            assignment = allAssignments[i];
            assignmentUrl = "/assignments/single/" + assignment._id.valueOf();

            formattedAssignment = {
                title: assignment.title,
                description: assignment.description,
                dueDate: (assignment.dueDate.getMonth() + 1) + "/" + (assignment.dueDate.getDate() + 1) + "/" +  assignment.dueDate.getFullYear(),
                assigner: assignment.assigner,
                dateAssigned: (assignment.dateAssigned.getMonth() + 1) + "/" + assignment.dateAssigned.getDate()  + "/" +  assignment.dateAssigned.getFullYear(),
                pointsPossible: assignment.pointsPossible,
                url: assignmentUrl
            }
            formattedAssignments.push(formattedAssignment);
        }
        return formattedAssignments;
    }
});
