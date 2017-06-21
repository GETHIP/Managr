import { Surveys } from '../../collections/surveys.js';
import { Questions } from '../../collections/questions.js';

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
}*/

/*Template.surveyFormTemplate.events({
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
});*/

Template.questionFormTemplate.events({
	 'change #questionFormm'(event){
     //keeps page from refreshing
      event.preventDefault();

      var select = document.getElementById("questionFormm");
      var option = select.value;
      console.log(option);

			questiontype();
   },
	 'click #buttonn': function(event, template) {

		 event.preventDefault();

		 var temparray;
		 var option = document.getElementById("questionFormm").value;
		 if(option == 'choice') {
			 var question = Session.get('choiceQuestion');
			 var choice1 = Session.get('choiceOption1');
			 var choice2 = Session.get('choiceOption2');
			 var choice3 = Session.get('choiceOption3');
			 var choice4 = Session.get('choiceOption4');
			 Session.set('choiceQuestion', null);
			 Session.set('choiceOption1', null);
			 Session.set('choiceOption2', null);
			 Session.set('choiceOption3', null);
			 Session.set('choiceOption4', null);
			 Session.set('choiceOption5', null);

			//  if ( != null){
			// 	 for(i = 0; i < 5; i++)
			//  		= temparray[i]; //temparray.push(''); ?
			//  }

			 temparray = [question, choice1, choice2, choice3, choice4];
			 //add card code here
		 }
		 else if(option == 'check') {
			// You can finish this for optimization later...
			// or just completely get rid of Session stuff and replace the messyness
			//  var checkArray = [];
			//  for (i = 0; i < 6; i++) {
			//
			//  }
			 var question = Session.get('checkQuestion');
			 var option1 = Session.get('checkOption1');
			 var option2 = Session.get('checkOption2');
			 var option3 = Session.get('checkOption3');
			 var option4 = Session.get('checkOption4');
			 var option5 = Session.get('checkOption5');
			 Session.set('checkQuestion', null);
			 Session.set('checkOption1', null);
			 Session.set('checkOption2', null);
			 Session.set('checkOption3', null);
			 Session.set('checkOption4', null);
			 Session.set('checkOption5', null);
			 console.log(question);
			 console.log(option1);
			 console.log(option2);
			 console.log(option3);
			 console.log(option4);
			 console.log(option5);
			 temparray = [question, option1, option2, option3, option4, option5];
			 //add card code here
		 }
		 else if(option == 'shResp') {
			 var shResp = Session.get('shRespQuestion');
			 Session.set('shRespQuestion', null);
			 temparray = [shResp];
			 //add card code here
		 } else {
			 alert("Please select an option");
		 }
		 Meteor.call('addQuestion', option, temparray);
	 }
});

function questiontype() {
	var select = document.getElementById("questionFormm");
	var option = select.value;
		// document.getElementById('questionSbmt').innerHTML = option;

	document.getElementById('MCdiv').style.display = 'none';
	document.getElementById('CBdiv').style.display = 'none';
	document.getElementById('FRdiv').style.display = 'none';

	if (option == "choice") {
		document.getElementById('MCdiv').style.display = 'block';
	}

	if (option == "check") {
		document.getElementById('CBdiv').style.display = 'block';
	}

	if (option == "shResp") {
		document.getElementById('FRdiv').style.display = 'block';
	}
}

/*async function questiontype() {
	var select = document.getElementById("questionFormm");
	var option = select.value;
	var testing = "testing"
	if (option == "yesNo") {
		document.getElementById('eachquestionentry').innerHTML = '{{>' + testing + '}}';
	}
}*/

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

// Meteor.startup(() => {
// 	Surveys.remove({});
// 	var temp = [{
// 		type: "yesNo",
// 		prompt: "Do you think we should make the United Sates like North Korea?"
// 	},{
// 		type: "check",
// 		prompt: "Check the boxes with your favorite number",
// 		answers: ["1", "2", "3"]
// 	}]
// 	Surveys.insert({"title": "Random Test", "dueDate":"December 2", "studentsAssigned": ["Will Guo", "Abby Brooks", "Katie GErot", "Nick Nguyen"], "surveyId":"154209", temp});
// });

Template.MCtemplate.events({
	'keyup #MCQuestion'(event) {
		Session.set('choiceQuestion', event.target.value);
	},
	'keyup #MC1question'(event) {
		Session.set('choiceOption1', event.target.value);
	},
	'keyup #MC2question'(event) {
		Session.set('choiceOption2', event.target.value);
	},
	'keyup #MC3question'(event) {
		Session.set('choiceOption3', event.target.value);
	},
	'keyup #MC4question'(event) {
		Session.set('choiceOption4', event.target.value);
	}
})

Template.CBtemplate.events({
	'keyup #checkQuestion'(event) {
		Session.set('checkQuestion', event.target.value);
	},
	'keyup #checkOption1'(event) {
		Session.set('checkOption1', event.target.value);
	},
	'keyup #checkOption2'(event) {
		Session.set('checkOption2', event.target.value);
	},
	'keyup #checkOption3'(event) {
		Session.set('checkOption3', event.target.value);
	},
	'keyup #checkOption4'(event) {
		Session.set('checkOption4', event.target.value);
	},
	'keyup #checkOption5'(event) {
		Session.set('checkOption5', event.target.value);
	},
})

Template.FRtemplate.events({
	'keyup #shRespQuestion'(event) {
		Session.set('shRespQuestion', event.target.value)
	}
})

Template.completedQuestion.events({

})

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
