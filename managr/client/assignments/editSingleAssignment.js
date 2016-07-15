Template.editSingleAssignment.onCreated(function() {
  Meteor.subscribe('Assignments');
});

// Provides the editSingle template with information on a single assignment
Template.editSingleAssignment.helpers({
  assignments: function() {
    var objects,thisAssignment;
		var a = Assignments.find({}).fetch();
		if (a.length != 0) {
			for (var i = 0; i < a.length; i++) {
				if (a[i]._id == FlowRouter.getParam("id")) {
					thisAssignment = a[i];
				}
			}
      function numPad(n) {
        if (n.toString().length == 1) {
          return "0" + n.toString();
        }
        else {
          return n.toString();
        }
      }
	    var cleanedObj;
	      cleanedObj = {
	        title: thisAssignment.title,
	        description: thisAssignment.description,
	        dueDate: (thisAssignment.dueDate.getFullYear() + 1) + "-" + numPad(thisAssignment.dueDate.getMonth()) + "-" +  numPad(thisAssignment.dueDate.getDate()),
	        assigner: thisAssignment.assigner,
	        dateAssigned: (thisAssignment.dueDate.getFullYear() + 1) + "-" + numPad(thisAssignment.dueDate.getMonth()) + "-" +  numPad(thisAssignment.dueDate.getDate()),
	        pointsPossible: thisAssignment.pointsPossible
	      }
	      return cleanedObj;
	    }
  	}
});

Template.editSingleAssignment.events({
  'submit .submitbtn2'(event) {
    event.preventDefault();
    const form = event.target;
		function randInst() {
			var myArray = ["Zach Merrill","James Getrost","Melanie Powell","Andy Elsaesser","Cooper Knaak","Max van Klinken","Logan Fitzgibbons"];
			console.log(typeof(myArray[Math.floor(Math.random() * myArray.length)]));
			return myArray[Math.floor(Math.random() * myArray.length)];
		}
    Assignments.update({
      _id:new Meteor.Collection.ObjectID(FlowRouter.getParam("id"))
    },
    {
      $set: {
        title: form.name.value,
        description: form.description.value,
        dueDate: form.dateDue.value,
        assigner: randInst(),
        dateAssigned: new Date(),
        pointsPossible: form.points.value
      }
    });
  }
});
