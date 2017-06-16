import { Student } from '../../collections/student.js';
import { Events } from '../../collections/event.js';

Template.createEvent.onCreated(function() {
    Meteor.subscribe("Student");
    Meteor.subscribe("Events");
});

Template.createEvent.events({
  "submit #eventForm"(event) {
    event.preventDefault();
    var target = event.target;

    var eventName = target.name.value;
    var description = target.description.value;

    console.log(eventName);
    console.log(description);

    Meteor.call("createNewEvent", eventName, description);

    FlowRouter.go('/events');
  }
});
