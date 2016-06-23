import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Comments } from '../collections/comments.js'

Template.post.onCreated(function(){
  Meteor.subscribe('Posts');
})

Template.writeComment.onCreated(function(){
  Meteor.subscribe('Posts')

})

Template.comment.onCreated(function(){
  // Meteor.subscribe('Comments');
// Importing Template for helpers and Assignments collection
import { Template } from "meteor/templating";
import { Assignments } from "../collections/assignments.js";

// Gives each template the Assignments collection
Template.single.onCreated(function() {
    Meteor.subscribe("Assignments");
});
Template.editSingle.onCreated(function () {
    Meteor.subscribe("Assignments");
});
Template.table.onCreated(function () {
    Meteor.subscribe("Assignments");
});
Template.listing.onCreated(function () {
    Meteor.subscribe("Assignments");
});
Template.newAssignment.onCreated(function () {
  Meteor.subscribe("Assignments");
});

// Provides the assignment data to the single template from Assignments collection
Template.single.helpers({
    assignments: function() {
        var objects;
        objects = Assignments.find({
            "_id": new Meteor.Collection.ObjectID(FlowRouter.getParam("id"))
        }).fetch();
        if (objects.length > 0) {
            var obj, cleanedObj;
            obj = objects[0];
            // The formatted object to be returned
            cleanedObj = {
                title: obj.title,
                description: obj.description,
                dueDate: (obj.dueDate.getMonth() + 1) + "/" + obj.dueDate.getDate() + "/" +  obj.dueDate.getFullYear(),
                assigner: obj.assigner,
                dateAssigned: (obj.dueDate.getMonth() + 1) + "/" + obj.dueDate.getDate() + "/" +  obj.dueDate.getFullYear(),
                pointsPossible: obj.pointsPossible
            }
            return cleanedObj;
        }
        else {
            return {};
        }
    }
});

Template.post.events({

});

// Provides the editSingle template with information on a single assignment
Template.editSingle.helpers({
    assignments: function() {
        var objects;
        objects = Assignments.find({
            "_id":new Meteor.Collection.ObjectID(FlowRouter.getParam("id"))
        }).fetch();
        if (objects.length > 0) {
            var obj, cleanedObj, i;
            obj = objects[0];
            // The formatted object to be returned
            cleanedObj = {
                title: obj.title,
                description: obj.description,
                dueDate: (obj.dueDate.getMonth() + 1) + "/" + obj.dueDate.getDate() + "/" +  obj.dueDate.getFullYear(),
                assigner: obj.assigner,
                dateAssigned: (obj.dueDate.getMonth() + 1) + "/" + obj.dueDate.getDate() + "/" +  obj.dueDate.getFullYear(),
                pointsPossible: obj.pointsPossible
            }
            return cleanedObj;
        }
        else {
            return {};
        }
    }
});

// Provides the table template with all the listed assignments
Template.table.helpers({
    assignments: function() {
        var list, objects, i;
        list = [];
        objects = Assignments.find({}).fetch();
        for (i = 0; i < objects.length; i++) {
            if (objects.length > 0) {
                var obj, j, aUrl, cleanedObj;
                obj = objects[i];
                aUrl = "./single/" + obj._id.valueOf();
                // The formatted object to be returned
                cleanedObj = {
                    title: obj.title,
                    description: obj.description,
                    dueDate: (obj.dueDate.getMonth() + 1) + "/" + obj.dueDate.getDate() + "/" +  obj.dueDate.getFullYear(),
                    assigner: obj.assigner,
                    dateAssigned: (obj.dueDate.getMonth() + 1) + "/" + obj.dueDate.getDate() + "/" +  obj.dueDate.getFullYear(),
                    pointsPossible: obj.pointsPossible,
                    url: aUrl
                }
                list.push(cleanedObj);
            }
        }
        return list;
    }
});

// Provides listing template with a list of assignments
Template.listing.helpers({
    assignments: function() {
        var list, objects, i;
        list = [];
        objects = Assignments.find({}).fetch();
        for (i = 0; i < objects.length; i++) {
            if (objects.length > 0) {
                var obj, j, cleanedObj;
                obj = objects[i];
                // The formatted object to be returned
                cleanedObj = {
                    title: obj.title,
                    description: obj.description,
                    dueDate: (obj.dueDate.getMonth() + 1) + "/" + obj.dueDate.getDate() + "/" +  obj.dueDate.getFullYear(),
                    assigner: obj.assigner,
                    dateAssigned: (obj.dueDate.getMonth() + 1) + "/" + obj.dueDate.getDate() + "/" +  obj.dueDate.getFullYear(),
                    pointsPossible: obj.pointsPossible
                }
                list.push(cleanedObj);
            }
        }
        return list;
    }
});

Template.editSingle.events({
  'submit .submitbtn2'(event) {
    event.preventDefault();
    const form = event.target;
    Assignments.update({
      _id:new Meteor.Collection.ObjectID(FlowRouter.getParam("id"))
    },
    {
      $set: {
        title: form.name.value,
        description: form.description.value,
        dueDate: form.dateDue.value,
        assigner: "Zach Merrill",
        dateAssigned: new Date(),
        pointsPossible: form.points.value
      }
    });
  }
});

Template.newAssignment.events({
  'submit .submitbtn'(event){
    event.preventDefault();
    const form = event.target;
    Assignments.insert({
      title: form.name.value,
      description: form.description.value,
      dueDate: form.dateDue.value,
      assigner: "Zach Merrill",
      dateAssigned: new Date(),
      pointsPossible: form.points.value
    });
  }
});

// Gives user window scope over the Assignments collection
window.Assignments = Assignments;
