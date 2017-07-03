import { Mongo } from 'meteor/mongo';

import {
    Template
} from 'meteor/templating';
import {
    ReactiveVar
} from 'meteor/reactive-var';
export const Events = new Mongo.Collection('Events');
export const Invites = new Mongo.Collection('invites');
EventSchema = new SimpleSchema({
    host: {
        type: String,
        label: "Host",
        optional: true,
        max: 50
    },
    hostId: {
        type: String,
        label: "HostId",
        optional: true,
        max: 50
    },
    name: {
        type: String,
        label: "Title",
        optional: true,
        max: 50
    },
    date: {
        type: String,
        label: "Date",
        optional: true
    },
    formattedDate: {
        type: String,
        label: "FDate",
        optional: true
    },
    time: {
        type: String,
        label: "Time",
        optional: true,
        max: 5
    },
    location: {
        type: String,
        label: "Location",
        //optional true
        optional: true,
        max: 100
    },
    description: {
        type: String,
        label: "Description",
        optional: true
    },
    rsvp: {
      type: [Object],
      blackbox: true,
      label: "rsvp",
      optional: true
    },
    reasonNotAttending: {
      type: String,
      label: "reasonNotAttending",
      optional: true
    }
});


UserProfile = new SimpleSchema({
    fullname: {
        type: String,
        label: "Fullname",
    },
    email: {
        type: String,
        label: "Email",
    },
    bio: {
        type: String,
        label: "Biography",
        max: 250
    }

});

invites = new SimpleSchema({
    invitee: {
        type: String,
        label: "invitee",
        max: 500
    },
    EventSchema: {
        type: EventSchema,
    }
});

Events.attachSchema(EventSchema);
