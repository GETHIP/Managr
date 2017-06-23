import { Student } from '../../collections/student.js';
import { Instructor } from '../../collections/instructor.js';
import { Events } from '../../collections/event.js';

Template.createEvent.onCreated(function() {
    Meteor.subscribe("Student");
    Meteor.subscribe("Events");
    Meteor.subscribe("Instructor");
});

Template.createEvent.events({
  "submit #eventForm"(event) {
    event.preventDefault();
    var target = event.target;

    var hostId = Instructor.findOne({userId: Meteor.userId()}).userId;
    var host = Instructor.findOne({userId: Meteor.userId()}).name;
    var eventName = target.name.value;
    var description = target.description.value;
    var location = target.location.value;
    var newDate = moment(target.date.value);
    var formattedDate = moment(newDate).format("MMMM D,  YYYY [at] h:mm A");
    var date = target.date.value;

    console.log(hostId);
    console.log(host);
    console.log(eventName);
    console.log(description);
    console.log(location);
    console.log(date);
    console.log(formattedDate);

    Meteor.call("createNewEvent", hostId, host, eventName, description, date, formattedDate, location);

    FlowRouter.go('/events');
  }
});
