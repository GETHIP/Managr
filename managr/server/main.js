// Import meteor for server / publish and Assignments to publish
import { Meteor } from 'meteor/meteor';
import { Assignments } from '../collections/assignments.js';

// Publishes Assignments collection so templates can subscribe to recieve collection data
Meteor.startup(() => {
    Meteor.publish('Assignments', function() {
        return Assignments.find();
    });
});
