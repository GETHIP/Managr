import { Student } from '../../collections/student.js';

Template.profileAttendance.onCreated(function() {
	var self = this;
	self.autorun(function() {
		self.subscribe('Student');
	});
});

Template.profileAttendance.helpers({
	ProfilesTable: function() {
		let Profiles = Student.find({});
		let ProfilesTable = [];

		Profiles.forEach(function(currentValue, index, profile){
			currentValue.total = 0;
			for(var i = 0; i<12; i++) {
				currentValue.total += currentValue.attendance[i];
			}
			currentValue.url = "/profile/" + currentValue._id;
			for(i in currentValue.attendance){
					if(currentValue.attendance[i] === true){
							currentValue.attendance[i] = "green";
					}
					if(currentValue.attendance[i] === false){
							currentValue.attendance[i] = "red";
					}
			}
			currentValue.parentNames = currentValue.parentNames.join(" and ");
			ProfilesTable.push(currentValue);
		});
	 	return ProfilesTable;
	},
	/*
	doc.url = "/profile/" + doc._id;
	doc.total = 0;
	for(i=0;i<12;i++) {
		doc.total += doc.attendance[i];
	}
	for(i in doc.attendance){
			if(doc.attendance[i] == true){
					doc.attendance[i] = "green";
			}
			if(doc.attendance[i] == false){
					doc.attendance[i] = "red";
			}
	}
	doc.parentNames = doc.parentNames.join(" and ");
	return doc;
	*/
	studentIndex: function(){
		return studentIndex;
	}
});
