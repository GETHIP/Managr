import {
    Events
} from '../../collections/event.js';


Template.eventView.helpers({
    event() {
        var router = FlowRouter.current();
        var userId = Meteor.userId();
        console.log(userId);
        var events = Events.findOne({
            _id: router.params.id
        });


        console.log(router);
        return events;
    },
});
