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
    var objects = Assignments.find({"_id":new Meteor.Collection.ObjectID(FlowRouter.getParam("id"))}).fetch();
    if (objects.length > 0) {
      var obj = objects[0];
      var strStudents = "";
      var numStudents = obj.assignedStudents;
      for (var i = 0; i < numStudents.length; i++) {
        strStudents += numStudents[i] + ", ";
      }
      strStudents = strStudents.slice(0, -2);
      console.log(obj.title)
      var cleanedObj = {
        title: obj.title,
        description: obj.description,
        dueDate: (obj.dueDate.getMonth() + 1) + '/' + obj.dueDate.getDate() + '/' +  obj.dueDate.getFullYear(),
        assigner: obj.assigner,
        assignedStudents: strStudents,
        dateAssigned: (obj.dueDate.getMonth() + 1) + '/' + obj.dueDate.getDate() + '/' +  obj.dueDate.getFullYear(),
        pointsPossible: obj.pointsPossible
      }
      return [cleanedObj];
    }
    else {
      return [];
    }
  }
});
Template.editSingle.helpers({
  assignments: function() {
    var objects = Assignments.find({"_id":new Meteor.Collection.ObjectID(FlowRouter.getParam("id"))}).fetch();
    if (objects.length > 0) {
      var obj = objects[0];
      var strStudents = "";
      var numStudents = obj.assignedStudents;
      for (var i = 0; i < numStudents.length; i++) {
        strStudents += numStudents[i] + ", ";
      }
      strStudents = strStudents.slice(0, -2);
      console.log(obj.title)
      var cleanedObj = {
        title: obj.title,
        description: obj.description,
        dueDate: (obj.dueDate.getMonth() + 1) + '/' + obj.dueDate.getDate() + '/' +  obj.dueDate.getFullYear(),
        assigner: obj.assigner,
        assignedStudents: strStudents,
        dateAssigned: (obj.dueDate.getMonth() + 1) + '/' + obj.dueDate.getDate() + '/' +  obj.dueDate.getFullYear(),
        pointsPossible: obj.pointsPossible
      }
      return [cleanedObj];
    }
    else {
      return [];
    }
  }
});
