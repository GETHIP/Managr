Template.viewAllAssignTable.onCreated(function() {
  Meteor.subscribe('Assignments');
});

Template.viewAllAssignTable.helpers({
    assignments: function() {
        var list, objects, i;
        list = [];
        objects = Assignments.find({}).fetch();
        console.log("Objects: " + objects.length);
        for (i = 0; i < objects.length; i++) {
            if (objects.length > 0) {
                var obj, j, aUrl, cleanedObj;
                obj = objects[i];
                aUrl = "/assignments/single/admin/" + obj._id.valueOf();
                // The formatted object to be returned
                cleanedObj = {
                    title: obj.title,
                    url: aUrl
                }
                list.push(cleanedObj);
            }
        }
        return list;
    }
});

// Provides the assignment data to the single template from Assignments collection
Template.viewAllAssignTable.events({
  'click #newAssignmentBtn'(event){
    window.location = "/assignments/edit/new";
  },
	'click #viewGradesBtn'(event) {
		window.location = '/assignments/grades';
	}
});
