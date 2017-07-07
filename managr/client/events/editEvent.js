import { Student } from '../../collections/student.js';
import { Events } from '../../collections/event.js';

Template.editEvent.onCreated(function() {
		Meteor.subscribe("Student");
    Meteor.subscribe("Events");
		Meteor.subscribe("Groups");

});

Template.editEvent.events({
  "submit #eventForm"(event) {
		event.preventDefault();
		var target = event.target;

		var eventId = FlowRouter.getParam("id");
		var eventName = target.name.value;
		var description = target.description.value;
		var location = target.location.value;
		var newDate = moment(target.date.value);
		var formattedDate = moment(newDate).format("MMMM D,  YYYY [at] h:mm A");
		var date = target.date.value;

		var sListData = Student.find().fetch();
    var gListData = Groups.find().fetch();
    var sList = [];
    var gList = [];
    var sCheckData = [];
    var gCheckData = [];

    var sCheckTrans = [];
    var gCheckTrans = [];
    console.log("ksdf");
    for (var i = 0; i < sListData.length; i++) {
      sList.push(sListData[i]._id);
    }

    for (var i = 0; i < gListData.length; i++) {
      gList.push(gListData[i]._id);
    }

    for (var i = 0; i < sList.length; i++) {
      sCheckData.push(document.getElementById(sList[i]).checked);
       console.log(sCheckData);
    }

    for (var i = 0; i < gList.length; i++) {
      gCheckData.push(document.getElementById(gList[i]).checked);
    }

    for (var i = 0; i < sCheckData.length; i++) {
      if(sCheckData[i] == true){
        sCheckTrans.push(sList[i]);
      }
    }

    for (var i = 0; i < gCheckData.length; i++) {
      if(gCheckData[i] == true){
        gCheckTrans.push(gList[i]);
      }
    }
    //
    console.log(sCheckTrans);
    console.log(gCheckTrans);


    Meteor.call('updateEvent', eventId, eventName, description, date, formattedDate, location, sCheckTrans, gCheckTrans);

		FlowRouter.go('/events');
	}
});

Template.editEvent.helpers({
	eventName: function() {
		return getThisEvent().name;
	}
});

Template.editEvent.helpers({
	eventDescription: function() {
		return getThisEvent().description;
	}
});

Template.editEvent.helpers({
	eventDate: function() {
		return getThisEvent().date;
	}
});

Template.editEvent.helpers({
	eventLocation: function() {
		return getThisEvent().location;
	}
});

var getThisEvent = function() {
	var id = FlowRouter.getParam("id");
	return Events.findOne({ _id: id });
}

import { Groups } from '../../collections/groups.js';

Template.editEvent.helpers({
  groups: function() {
      var allGroups = Groups.find({}).fetch();
			console.log(allGroups);
      var formattedGroups = [];
      for (var i = 0; i < allGroups.length; i++) {
				var status = "";
				console.log(getThisEvent().groupInvites.indexOf(allGroups[i]._id));
				if(getThisEvent().groupInvites.indexOf(allGroups[i]._id) != -1){
					status = "checked";
				}else{
					status = ""
				}
				console.log(status);
          var formattedGroup = {
              name: allGroups[i].name,
              id: allGroups[i]._id,
							checkedS: status
          }
          formattedGroups.push(formattedGroup);
      }
			console.log(formattedGroups);
      return formattedGroups;
  },
    students: function() {
        var allStudents = Student.find({}).fetch();
        var formattedStudents = [];
        for(var i = 0; i < allStudents.length; i++) {
					var satus = "";
					console.log(allStudents[i]);
					console.log(getThisEvent().studentInvites);
					console.log(getThisEvent().studentInvites.indexOf(allStudents[i]._id));
					if(getThisEvent().studentInvites.indexOf(allStudents[i]._id)!= -1){
						status = "checked";
					}else{
						status = ""
					}
					console.log("The status is: " + status);
            var student = allStudents[i];
            var formattedStudent = {
                name: student.name,
                studentId: student._id,
								checkedS : status
            }
            formattedStudents.push(formattedStudent);
        }
        return formattedStudents;
    }
});




// var newformatStudentsForGroup = function(studentIds) {
//     var formattedStudents = [];
//
//     for(var i = 0; i < studentIds.length; i++) {
//         var student = Student.findOne({_id: studentIds[i]});
//         if(student == undefined) {
//             continue;
//         }
//         name = student.name;
//         formattedStudents.push(name);
//     }
//     return formattedStudents;
// }
