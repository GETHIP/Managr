import {
    Events
} from '../../collections/event.js';
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
