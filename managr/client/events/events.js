import { Events } from '../../collections/event.js';
import { EasySearch } from 'meteor/easy:search';

Template.eventsPage.onRendered(() => {
  Meteor.subscribe("Events");
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

  'click .slider': function(event){
    if(document.getElementById("indicator").innerHTML == "Attending"){
        document.getElementById("indicator").innerHTML = "Not Attending"
    }else{
        document.getElementById("indicator").innerHTML = "Attending"
    }
  }
});
Template.eventsPage.helpers({
  events: function() {
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
