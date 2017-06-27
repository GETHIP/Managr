import { Invites } from '../../collections/event.js';


Template.invites.helpers({
    invites() {
      var userId = Meteor.userId();
      var invites = Invites.find({"invitee._id": userId} );

      return invites;
    },
});
