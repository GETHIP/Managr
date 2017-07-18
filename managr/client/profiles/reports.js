import { Student } from '../../collections/student.js';

function csvDownload(array, name) {
	let csv = Papa.unparse(array);
	csv = new Blob([csv], { type: 'text/csv;charset=utf-8;' } );
	saveAs(csv, "Report.csv");
}

function isChecked(key) {
    return document.getElementById(key + "CheckBox").checked
        || document.getElementById("allCheckBox").checked;
}

Template.reports.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('Student');
  });
});

Template.reports.events({
  'change #reportsSelect' (event){
    switch (event.target.value) {
      case "T-Shirt Size Report":
      Session.set("reports", "tShirtSizeReport");
      break;
      case "Email Report":
      Session.set("reports", "emailReport");
      break;
      case "Select a report":
      Session.set("reports", "blank");
      break;
      case "Name Report":
      Session.set("reports", "nameReport");
      break;
      case "Age Report":
      Session.set("reports", "ageReport");
      break;
      case "School Report":
      Session.set("reports", "schoolReport");
      break;
      case "Address Report":
      Session.set("reports", "addressReport");
      break;
      case "All":
      Session.set("reports","allReport");
      break;
    }
  },
  'change #namesIncluded' (event){
    Session.set("checked", event.target.checked);
  },
	'click #reportsBackButton' (event){
		FlowRouter.go('/dashboard');
	},
  'click #csvExport' (event){
    let students = Student.find({});
    let array = {};
    array.data = [];
    array.fields = ["Name"];
    if (isChecked("description")) {
        array.fields.push("Description");
    }
    if (isChecked("age")) {
        array.fields.push("Age");
    }
    if (isChecked("grade")) {
        array.fields.push("Grade");
    }
    if (isChecked("school")) {
        array.fields.push("School");
    }
    if (isChecked("email")) {
        array.fields.push("Email");
    }
    if (isChecked("getHipYear")) {
        array.fields.push("Get Hip Year");
    }
    if (isChecked("phoneNumber")) {
        array.fields.push("Phone Number");
    }
    if (isChecked("parents")) {
        array.fields.push("Parent 1");
        array.fields.push("Parent 2");
    }
    if (isChecked("strengths")) {
        array.fields.push("Strength 1");
        array.fields.push("Strength 2");
        array.fields.push("Strength 3");
        array.fields.push("Strength 4");
        array.fields.push("Strength 5");
    }
    if (isChecked("ep10")) {
        array.fields.push("EP 10 1");
        array.fields.push("EP 10 2");
        array.fields.push("EP 10 3");
        array.fields.push("EP 10 4");
    }
    if (isChecked("github")) {
        array.fields.push("Github");
    }
    if (isChecked("blog")) {
        array.fields.push("Blog");
    }
    students.forEach((student) => {
        var line = [student.name];
        if (isChecked("description")) {
            line.push(student.description);
        }
        if (isChecked("age")) {
            line.push(student.age);
        }
        if (isChecked("grade")) {
            line.push(student.grade);
        }
        if (isChecked("school")) {
            line.push(student.school);
        }
        if (isChecked("email")) {
            line.push(student.email);
        }
        if (isChecked("getHipYear")) {
            line.push(student.getHipYear);
        }
        if (isChecked("phoneNumber")) {
            line.push(student.phoneNumber);
        }
        if (isChecked("parents")) {
            line.push(student.parentNames[0]);
            line.push(student.parentNames[1]);
        }
        if (isChecked("strengths")) {
            line.push(student.strengths[0]);
            line.push(student.strengths[1]);
            line.push(student.strengths[2]);
            line.push(student.strengths[3]);
            line.push(student.strengths[4]);
        }
        if (isChecked("ep10")) {
            line.push(student.ep10[0]);
            line.push(student.ep10[1]);
            line.push(student.ep10[2]);
            line.push(student.ep10[3]);
        }
        if (isChecked("github")) {
            line.push(student.github);
        }
        if (isChecked("blog")) {
            line.push(student.blog);
        }
        array.data.push(line);
    });
	let csv = Papa.unparse(array);
	csv = new Blob([csv], { type: 'text/csv;charset=utf-8;' } );
	saveAs(csv, "Report.csv");
  },
});
