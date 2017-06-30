import { Events } from '../../collections/event.js';
import { Student } from '../../collections/student.js';
import { EasySearch } from 'meteor/easy:search';

Template.eventsPage.onRendered(() => {
  Meteor.subscribe("Events");
  Meteor.subscribe("Student");
})

Template.eventsPage.events({
  'click #calendarButton': function(event, template) {
    event.preventDefault();
    FlowRouter.go('/events/calendar');
},
  'click #createEventButton': function(event, template) {
    event.preventDefault();
    FlowRouter.go('/events/createEvent');
  },
  'click .goToEdit': function(event) {
    event.preventDefault();
    const target = event.target;
    FlowRouter.go('/events/edit/' + target.id);
  },
  'click .goToInvite': function(event) {
    event.preventDefault();
    const target = event.target;
    FlowRouter.go('/events/invite/' + target.id);
  },
  'click .goToView': function(event) {
    event.preventDefault();
    const target = event.target;
    FlowRouter.go('/events/view/' + target.id);
  },
  'click .attendingButton': function(event, template) {
    event.preventDefault();
    const target = event.target;
    FlowRouter.go('/events/attending/' + target.id);
  },
  'click #eventTitle': function(event, template) {
    event.preventDefault();
    FlowRouter.go('/events/view');
  },
});

var formatStudentsForGroup = function(group) {
    var userIds = group.userIds;
    var formattedStudents = [];


    for(var i = 0; i < userIds.length; i++) {
        var student = Student.findOne({_id: userIds[i]});
        if(student == undefined) {
            continue;
        }
        var formattedStudent = {
            name: student.name
        }
        formattedStudents.push(formattedStudent);
    }
    return formattedStudents;
}

Template.eventsPage.helpers({
    events: function() {
        var studentID = Student.findOne({userId: Meteor.user()._id});
        var studentName = studentID._id;
        var allGroups = Groups.find({ userIds: studentName }).fetch();
        var formattedGroups = [];
        for(var i = 0; i < allGroups.length; i++) {
            var group = allGroups[i];
            var formattedGroup = {
                name: group.name,
                students: formatStudentsForGroup(group),
                groupId: group._id,
                size: group.studentIds.length,
                leader: group.leader
            }
            formattedGroups.push(formattedGroup);
        }
        formattedGroups.sort(function(group1, group2) {
            return group1.name.localeCompare(group2.name);
        });
        return formattedGroups;
    },

    namesInGroup: function() {
        if(document.getElementById("namesInGroup").style.height > 200) {
            document.getElementById("namesInGroup").style.overflowY = "scroll";
        }
    }
});
// console.log(studentID);
// console.log(studentName);
// console.log(allGroups);

// Template.eventsPage.helpers({
//   eventsHelper() {
// var events = Events.find({
//     date: {
//         $gte: new Date()
//     }
// }, {
//     sort: {
//         date: 1
//     }
// }).fetch();
// for (event of events) {
//             var user = Meteor.users.findOne({
//                 "_id": event.host
//             })
//             console.log(user);
//             event.host = user.profile.firstname + " " + user.profile.lastname + " (" + user.username + ") "
//         }
//         console.log('it worked');
//         return events;
// },
// });


Template.eventsPage.helpers({

  events: function() {
    // var events = Events.find({
    //     Date: {
    //         $gte: new Date()
    //     }
    // }, {
    //     sort: {
    //         date: 1
    //     }
    // }).fetch();

    var allEvents = Events.find({}).fetch();
    var formattedEvents = [];
    for(var i = 0; i < allEvents.length; i++) {
        var event = allEvents[i];
        var formattedevent = {
            name: event.name,
            students: formatStudentsForevent(event),
            eventId: event._id,
            size: event.size,
            leader: event.leader
        }
        formattedEvents.push(formattedevent);
    }
    formattedEvents.sort(function(event1, event2) {
        return event1.name.localeCompare(event2.name);
    });
    return formattedEvents;
    return Events.find();
  },
  eventsIndex: function() {
      return eventsIndex;
  }

  });


  Template.eventsPage.events({
    'click .deleteEventButton': function(event){
      Modal.show("deleteEvent", event.target.id);
    },
  })

  var formatStudentsForevent = function(event) {
      var studentIds = event.studentIds;
      var formattedStudents = [];

      for(var i = 0; i < studentIds.length; i++) {
          var student = Student.findOne({_id: studentIds[i]});
          if(student == undefined) {
              continue;
          }
          var formattedStudent = {
              name: student.name
          }
          formattedStudents.push(formattedStudent);
      }
      return formattedStudents;
  }
