import { Template } from 'meteor/templating';
import { Assignments } from '../collections/assignments.js';
Template.single.onCreated(function() {
  Meteor.subscribe('Assignments');
});
Template.editSingle.onCreated(function () {
  Meteor.subscribe('Assignments');
});
Template.table.onCreated(function () {
  Meteor.subscribe('Assignments');
});
Template.listing.onCreated(function () {
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
Template.table.helpers({
  assignments: function() {
    var list = [];
    var objects = Assignments.find({}).fetch();
    for (var i = 0; i < objects.length; i++) {
      if (objects.length > 0) {
        var obj = objects[i];
        var strStudents = "";
        var numStudents = obj.assignedStudents;
        for (var j = 0; j < numStudents.length; j++) {
          strStudents += numStudents[j] + ", ";
        }
        strStudents = strStudents.slice(0, -2);
        var cleanedObj = {
          title: obj.title,
          description: obj.description,
          dueDate: (obj.dueDate.getMonth() + 1) + '/' + obj.dueDate.getDate() + '/' +  obj.dueDate.getFullYear(),
          assigner: obj.assigner,
          assignedStudents: strStudents,
          dateAssigned: (obj.dueDate.getMonth() + 1) + '/' + obj.dueDate.getDate() + '/' +  obj.dueDate.getFullYear(),
          pointsPossible: obj.pointsPossible,
          url: obj._id.valueOf()
        }
        list.push(cleanedObj);
      }
    }
    return list;
  }
});
Template.listing.helpers({
  assignments: function() {
    var list = [];
    var objects = Assignments.find({}).fetch();
    for (var i = 0; i < objects.length; i++) {
      if (objects.length > 0) {
        var obj = objects[i];
        var strStudents = "";
        var numStudents = obj.assignedStudents;
        for (var j = 0; j < numStudents.length; j++) {
          strStudents += numStudents[j] + ", ";
        }
        strStudents = strStudents.slice(0, -2);
        var cleanedObj = {
          title: obj.title,
          description: obj.description,
          dueDate: (obj.dueDate.getMonth() + 1) + '/' + obj.dueDate.getDate() + '/' +  obj.dueDate.getFullYear(),
          assigner: obj.assigner,
          assignedStudents: strStudents,
          dateAssigned: (obj.dueDate.getMonth() + 1) + '/' + obj.dueDate.getDate() + '/' +  obj.dueDate.getFullYear(),
          pointsPossible: obj.pointsPossible
        }
        list.push(cleanedObj);
      }
    }
    return list;
  }
})

window.Assignments = Assignments;
