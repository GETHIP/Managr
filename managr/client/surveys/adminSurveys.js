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
/*
Template.surveyFormTemplate.events({
	 'click #surveySbmt'(event){
     //keeps page from refreshing
      event.preventDefault();
      const name = event.target.name.value;
      const dateDue = event.target.dueDate.value;
      //const assigned = event.target.assigned.value; //assigned not defined
      //assigned will be pulled from an array created by checkboxes
      Surveys.insert({
        title:name,
        dueDate:dateDue,
				question:Questions
      });
   }
});
*/

Template.questionFormTemplate.events({
	 'change #questionFormm'(event){
     //keeps page from refreshing
      event.preventDefault();

      var select = document.getElementById("questionFormm");
      var option = select.value;
      console.log(option);

			questiontype();
   },
});

function questiontype() {
	var select = document.getElementById("questionFormm");
	var option = select.value;
		// document.getElementById('questionSbmt').innerHTML = option;

	document.getElementById('YNdiv').style.display = 'none';
	document.getElementById('MCdiv').style.display = 'none';
	document.getElementById('CBdiv').style.display = 'none';
	document.getElementById('FRdiv').style.display = 'none';

	if (option == "yesNo") {
		document.getElementById('YNdiv').style.display = 'block';//'none'
	}

	if (option == "choice") {
		document.getElementById('MCdiv').style.display = 'block';
	}

	if (option == "check") {
		document.getElementById('CBdiv').style.display = 'block';
	}

	if (option == "shResp") {
		document.getElementById('FRdiv').style.display = 'block';
	}


		// document.getElementById('visibleDiv').style.visibility='visible';//hidden
}

// document.getElementById('visibleDiv').style.display = 'none';
// document.visibleDiv.style.visibility='visible';//hidden


/*
async function questiontype() {
	var select = document.getElementById("questionFormm");
	var option = select.value;
	var testing = "testing"
	if (option == "yesNo") {
		document.getElementById('eachquestionentry').innerHTML = '{{>' + testing + '}}';
	}
}
*/

Template.surveyFormTemplate.helpers({
	allsurveys: function() {
		return Surveys.find();

      const type = event.target.selectType.value;
			const prompt = event.target.prompt.value;
			const answers = [];
      question.insert({
				type:type,
				prompt:prompt,
				answers:answers
      });
		}
});
Meteor.startup(() => {
	Surveys.remove({});
	var temp = [{
		type: "yesNo",
		prompt: "Do you think we should make the United Sates like North Korea?"
	},{
		type: "check",
		prompt: "Check the boxes with your favorite number",
		answers: ["1", "2", "3"]
	}]
	Surveys.insert({"title": "Random Test", "dueDate":"December 2", "studentsAssigned": ["Will Guo", "Abby Brooks", "Katie GErot", "Nick Nguyen"], "surveyId":"154209", temp});
});
/************ DO NOT UNCOMMENT ************/
/*Questions = new SimpleSchema({
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
