import { Student } from '../../collections/student.js';

function csvDownload(array, name){
	console.log(array);
	let csv = Papa.unparse(array);
	csv = new Blob([csv], { type: 'text/csv' } );
	saveAs(csv, name + ".csv");
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
  'click #csvExport' (event){
    let students = Student.find({});
    let array = {};
    array.data = [];
    array.fields = ["Name"];
    let checked = Session.get("checked");
    switch (Session.get("reports")) {
      case "tShirtSizeReport":
      students.forEach(function(currentValue, index){
        array.data.push([currentValue.name, currentValue.tshirtSize]);
      });
      array.fields.push("T-Shirt Size");
      csvDownload(array, "T-Shirt Report");
      break;
      case "emailReport":
      students.forEach(function(currentValue, index){
        array.data.push([currentValue.name, currentValue.email]);
      });
      array.fields.push("Email");
      csvDownload(array, "Email Report");
      break;
      case "nameReport":
      students.forEach(function(currentValue, index){
        array.data.push([currentValue.name]);
      });
      array.fields = ["Name"];
      csvDownload(array, "Name Report");
      break;
      case "ageReport":
      students.forEach(function(currentValue, index){
        array.data.push([currentValue.name, currentValue.age]);
      });
      array.fields.push("Age");
      csvDownload(array, "Age Report");
      break;
      case "schoolReport":
      students.forEach(function(currentValue, index){
        array.data.push([currentValue.name, currentValue.school]);
      });
      array.fields.push("School");
      csvDownload(array, "School Report");
      break;
      case "addressReport":
      students.forEach(function(currentValue, index){
        array.data.push([currentValue.name, currentValue.address.street + " " + currentValue.address.city + " " + currentValue.address.state + " " + currentValue.address.zipCode]);
      });
      array.fields.push("Address");
      csvDownload(array, "Address Report");
      break;
      case "allReport":
      students.forEach(function(currentValue, index){
        array.data.push([currentValue.name, currentValue.school, currentValue.age, currentValue.email, currentValue.parentNames[0] + " and " + currentValue.parentNames[1],currentValue.description, currentValue.grade, currentValue.getHipYear, currentValue.phoneNumber, currentValue.blog, currentValue.address.street + " " + currentValue.address.city + " " + currentValue.address.state + " " + currentValue.address.zipCode]);
      });
      array.fields = ["Name", "School", "Age", "Email", "Parent Names", "Description", "Grade", "Get Hip Year", "Phone Number", "Blog", "Address"];
      csvDownload(array, "All Report");
      break;
    }
  },
		'change #uploadCsv' (event){
			event.preventDefault();
			var reader = new FileReader();
			var file = document.querySelector('#uploadCsv').files[0];
			var data;
			reader.readAsText(file);
			reader.addEventListener("load", function (file) {
				data = Papa.parse(reader.result);
				data = data.data;
				for(i=1;i<data.length-1;i++){
				    if(data[i][4].indexOf("and") === -1){
								data[i][4] = [data[i][4]];
				    }else{
				    		data[i][4] = data[i][4].split(" and ");
					  }
						Meteor.call('addStudent', data[i]);
				}
			}, false);
		}
});

Template.reports.helpers({
  reports: function(){
	var report = Session.get("reports");
	return Student.find({}).map((student) => {
		if (report == "tShirtSizeReport") {
			student.report = student.tshirtSize;
		} else if (report == "emailReport") {
			student.report = student.email;
		} else if (report == "nameReport") {
			student.report = student.name;
		} else if (report == "ageReport") {
			student.report = student.age;
		} else if (report == "schoolReport") {
			student.report = student.school;
		} else if (report == "addressReport") {
			var address = student.address.street;
			address += " " + student.address.city;
			address += " " + student.address.state;
			address += " " + student.address.zipCode;
			student.report = address;
		} else {
			student.report = "All Fields";
		}
		return student;
	});
    let students = Student.find({});
    let array = [];
    let checked = Session.get("checked");
    switch (Session.get("reports")) {
      case "tShirtSizeReport":
      students.forEach(function(currentValue, index){
        array.push(currentValue.name + ": " + currentValue.tshirtSize);
      });
      return array.join(", ");
      break;
      case "emailReport":
      students.forEach(function(currentValue, index){
        array.push(currentValue.name + ": " + currentValue.email);
      });
      return array.join(", ");
      break;
      case "nameReport":
      students.forEach(function(currentValue, index){
        array.push(currentValue.name);
      });
      return array.join(", ");
      break;
      case "ageReport":
      students.forEach(function(currentValue, index){
        array.push(currentValue.name + ": " + currentValue.age);
      });
      return array.join(", ");
      case "schoolReport":
      students.forEach(function(currentValue, index){
        array.push(currentValue.name + ": " + currentValue.school);
      });
      return array.join(", ");
      case "addressReport":
      students.forEach(function(currentValue, index){
        array.push(currentValue.name + ": " + currentValue.address.street + " " + currentValue.address.city + " " + currentValue.address.state + " " + currentValue.address.zipCode);
      });
      return array.join(", ");
      case "blank":
      return "";
      break;
    }
  }
});
