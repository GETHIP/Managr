import { Meteor } from 'meteor/meteor';
import { Assignments } from '../collections/assignments.js';
Meteor.startup(() => {
  Meteor.publish('Assignments', function() {
    return Assignments.find();
  });
});
