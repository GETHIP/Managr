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
