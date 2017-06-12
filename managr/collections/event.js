import {
    Template
} from 'meteor/templating';
import {
    ReactiveVar
} from 'meteor/reactive-var';

export const Events = new Mongo.Collection('events');
export const Invites = new Mongo.Collection('invites');

event = new SimpleSchema({
    host: {
        type: String,
        label: "Host",
        max: 50
    },
    name: {
        type: String,
        label: "Title",
        max: 50
    },
    date: {
        type: Date,
        label: "Date",
    },
    time: {
        type: String,
        label: "Time",
        max: 5
    },
    location: {
        type: String,
        label: "Location",
        optional: true,
        max: 100
    },
    description: {
        type: String,
        label: "Description",
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
    event: {
        type: event,
    }
});
