/*surveysPage.events({

var getSurveysCompleted = function(student) {
    var surveysAssignments = student.survey;
    var completed = 0;
    for(var i = 0; i < studentSurvey.length; i++) {
        if(studentSurvey[i].completed) {
            completed++;
        }
    }
    return completed;
}
*/

Template.surveysPage.events({
	 'click #surveySbmt'(event){
     //keeps page from refreshing
      event.preventDefault();
      const name = event.target.name.value;
      const dateDue = event.target.dueDate.value;
      //const assigned = event.target.assigned.value; //assigned not defined
      //assigned will be pulled from an array created by checkboxes
      Surveys.insert({
        title:name,
        dueDate:dateDue
      });
   }
});

/************ DO NOT UNCOMMENT ************/
/*question = new SimpleSchema({
	type: {
		type: String
	},
	prompt: {
		type: String
	},
	answers: {
		type: [String]
	}
});
Surveys.schema = new SimpleSchema({
    title: {
        type: String,
        label: "Title",
        optional: false
    },
    dueDate: {
        type: Date,
        label: "Due Date",
        optional: false
    },
    studentsCompleted: {
        type: Number,
        label: "Students Completed",
        optional: true
    },
    studentsAssigned: {
        type: [String],
        label: "Students Assigned",
        optional: false
    },
    question: {
      type: [question]
    }

});

Surveys.attachSchema(Surveys.schema);*/
