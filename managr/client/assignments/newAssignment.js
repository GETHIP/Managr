Template.newAssignment.onCreated(function() {
  Meteor.subscribe('Assignments');
});

Template.newAssignment.helpers({
  assignments: function() {
    var list, objects, i;
    list = [];
    objects = Assignments.find({}).fetch();
    for (i = 0; i < objects.length; i++) {
      if (objects.length > 0) {
        var obj, j, cleanedObj;
        obj = objects[i];
        // The formatted object to be returned
        cleanedObj = {
          title: obj.title,
          description: obj.description,
          dueDate: (obj.dueDate.getMonth() + 1) + "/" + obj.dueDate.getDate() + "/" +  obj.dueDate.getFullYear(),
          assigner: obj.assigner,
          dateAssigned: (obj.dueDate.getMonth() + 1) + "/" + obj.dueDate.getDate() + "/" +  obj.dueDate.getFullYear(),
          pointsPossible: obj.pointsPossible
        }
        list.push(cleanedObj);
      }
    }
    return list;
  }
});

Template.newAssignment.events({
    'click #createAssignment'(event){
        window.location = "/assignments";
    }
});

Template.newAssignment.events({
  'submit .submitbtn'(event){
    event.preventDefault();
    const form = event.target;
		function randInst() {
			var myArray = ["Zach Merrill","James Getrost","Melanie Powell","Andy Elsaesser","Cooper Knaak","Max van Klinken","Logan Fitzgibbons"];
			return myArray[Math.floor(Math.random() * myArray.length)];
		}
    console.log(document.getElementById("editor"));
    Assignments.insert({
      title: form.name.value,
      description: document.getElementById("editor").innerHTML,
      dueDate: form.dateDue.value,
      assigner: randInst(),
      dateAssigned: new Date(),
      pointsPossible: form.points.value
    });
  }
});
