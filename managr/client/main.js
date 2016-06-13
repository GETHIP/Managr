import { Template } from 'meteor/templating';
import { Assignments } from '../collections/assignments.js';
Template.single.onCreated(function() {
  Meteor.subscribe('Assignments');
});
Template.editSingle.onCreated(function () {
  Meteor.subscribe('Assignments');
});
Template.single.helpers({
  assignments: function() {
    var param = FlowRouter.getParam("id");
    console.log(param);
    var obj = new Meteor.Collection.ObjectID(param);
    console.log(obj);
    var filter = {"_id":obj}
    console.log(filter);
    var a = Assignments.find(filter);
    console.log(a);
    console.log(a.fetch());
    return a;
  }
});
Template.editSingle.helpers({
  assignments: function() {
    var param = FlowRouter.getParam("id");
    console.log(param);
    var obj = new Meteor.Collection.ObjectID(param);
    console.log(obj);
    var filter = {"_id":obj}
    console.log(filter);
    var a = Assignments.find(filter);
    console.log(a);
    console.log(a.fetch());
    return a;
  }
});
