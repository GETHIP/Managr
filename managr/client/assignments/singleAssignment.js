Template.singleAssignment.onCreated(function() {
  Meteor.subscribe('Assignments');
});

Template.singleAssignment.helpers({
    assignments: function() {
        var objects,thisAssignment;
				var a = Assignments.find({}).fetch();
				if (a.length != 0) {
					for (var i = 0; i < a.length; i++) {
						if (a[i]._id == FlowRouter.getParam("id")) {
							thisAssignment = a[i];
						}
					}
	        var cleanedObj;
	        cleanedObj = {
	            title: thisAssignment.title,
	            description: thisAssignment.description,
	            dueDate: (thisAssignment.dueDate.getMonth() + 1) + "/" + thisAssignment.dueDate.getDate() + "/" +  thisAssignment.dueDate.getFullYear(),
	            assigner: thisAssignment.assigner,
	            dateAssigned: (thisAssignment.dateAssigned.getMonth() + 1) + "/" + thisAssignment.dateAssigned.getDate() + "/" +  thisAssignment.dateAssigned.getFullYear(),
	            pointsPossible: thisAssignment.pointsPossible
	        }
	        return cleanedObj;
				}
    }
});
