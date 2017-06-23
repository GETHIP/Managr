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

  Template.eventsPage.events({
    'click .deleteEventButton': function(event){
      Modal.show("deleteEvent", event.target.id);
    },
  })
