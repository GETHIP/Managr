Template.studentsAllAssignments.onCreated(function() {
  Meteor.subscribe('Assignments');
});

// Provides the table template with all the listed assignments
Template.studentsAllAssignments.helpers({
    assignments: function() {
        var list, objects, i;
        list = [];
        objects = Assignments.find({}).fetch();
        for (i = 0; i < objects.length; i++) {
            if (objects.length > 0) {
                var obj, j, aUrl, cleanedObj;
                obj = objects[i];
                aUrl = "/assignments/single/" + obj._id.valueOf();
                // The formatted object to be returned
                cleanedObj = {
                    title: obj.title,
                    description: obj.description,
                    dueDate: (obj.dueDate.getMonth() + 1) + "/" + (obj.dueDate.getDate() + 1) + "/" +  obj.dueDate.getFullYear(),
                    assigner: obj.assigner,
                    dateAssigned: (obj.dateAssigned.getMonth() + 1) + "/" + obj.dateAssigned.getDate()  + "/" +  obj.dateAssigned.getFullYear(),
                    pointsPossible: obj.pointsPossible,
                    url: aUrl
                }
                list.push(cleanedObj);
            }
      }
    return list;
  }
});
