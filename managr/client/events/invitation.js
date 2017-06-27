import { Events } from '../../collections/event.js';
import { Invites } from '../../collections/event.js';

Template.invitePage.events({
    'submit #peopleForm': function (event) {
        event.preventDefault();

        var id = FlowRouter.getParam("id");
        var router = FlowRouter.current();
        var eventInvite = Events.findOne({
            _id: router.params.id
        })

        var invitee = event.target.userName.value
        var user = Meteor.users.findOne({
          // username: e.target.id
            "_id": invitee
        })
        var inviteeId = Invites.insert({
            invitee: user,
            event: eventInvite
        })
        console.log(id);
        console.log(eventInvite);
        console.log(invitee);
        console.log(user);
        console.log(inviteeId);
    }
})