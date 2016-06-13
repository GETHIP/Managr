import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  Meteor.publish("Comments", function(){
    return Comments.find();
  });
});
