import { Events } from '../../collections/event.js';
import { EasySearch } from 'meteor/easy:search';

Template.eventsPage.events({

  'click #calendar': function(event, template) {
    event.preventDefault();
    FlowRouter.go('/events/calendar');
},
  'click #createEventButton': function(event, template) {
    event.preventDefault();
    FlowRouter.go('/events/createEvent');
  },

  'click #editEventButton': function(event, template) {
    event.preventDefault();
    FlowRouter.go('/editEvent');

  },
  'click #attendingButton': function(event, template) {
    event.preventDefault();
    FlowRouter.go('/events/Attending');
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
    return Events.find();
  },
  eventsIndex: function() {
      return eventsIndex;
  }
  });
  Template.createEvent.events({
      'submit #eventForm': function (event) {
          event.preventDefault();
          var host = Meteor.userId();
          var name = event.target.name.value
          var description = event.target.description.value
          var date = new Date(Date.parse(event.target.date.value))
          console.log(date);
          var location = event.target.location.value
          var eventId = Events.insert({
              name: name,
              host: host,
              description: description,
              date: date,
              location: location
          })
          if (eventId) {
              FlowRouter.go('/eventView/' + eventId);
          }
          console.log(eventId);
      }
  })
