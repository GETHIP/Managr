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

// Provides the assignment data to the single template from Assignments collection
Template.single.helpers({
    assignments: function() {
        var objects;
        objects = Assignments.find({
            "_id": new Meteor.Collection.ObjectID(FlowRouter.getParam("id"))
        }).fetch();
        if (objects.length > 0) {
            var obj, strStudents, numStudents, cleanedObj;
            obj = objects[0];
            strStudents = "";
            numStudents = obj.assignedStudents;
            for (var i = 0; i < numStudents.length; i++) {
                strStudents += numStudents[i] + ", ";
            }
            strStudents = strStudents.slice(0, -2);
            // The formatted object to be returned
            cleanedObj = {
                title: obj.title,
                description: obj.description,
                dueDate: (obj.dueDate.getMonth() + 1) + "/" + obj.dueDate.getDate() + "/" +  obj.dueDate.getFullYear(),
                // TODO query users collection to get names of students and instructors
                assigner: obj.assigner,
                assignedStudents: strStudents,
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

// Provides the editSingle template with information on a single assignment
Template.editSingle.helpers({
    assignments: function() {
        var objects;
        objects = Assignments.find({
            "_id":new Meteor.Collection.ObjectID(FlowRouter.getParam("id"))
        }).fetch();
        if (objects.length > 0) {
            var obj, strStudents, cleanedObj, numStudents, i;
            obj = objects[0];
            strStudents = "";
            numStudents = obj.assignedStudents;
            for (i = 0; i < numStudents.length; i++) {
                strStudents += numStudents[i] + ", ";
            }
            strStudents = strStudents.slice(0, -2);
            // The formatted object to be returned
            cleanedObj = {
                title: obj.title,
                description: obj.description,
                dueDate: (obj.dueDate.getMonth() + 1) + "/" + obj.dueDate.getDate() + "/" +  obj.dueDate.getFullYear(),
                assigner: obj.assigner,
                assignedStudents: strStudents,
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
                var obj, strStudents, j, aUrl, cleanedObj;
                obj = objects[i];
                strStudents = "";
                numStudents = obj.assignedStudents;
                for (j = 0; j < numStudents.length; j++) {
                    strStudents += numStudents[j] + ", ";
                }
                strStudents = strStudents.slice(0, -2);
                aUrl = "./assignments/single/" + obj._id.valueOf();
                // The formatted object to be returned
                cleanedObj = {
                    title: obj.title,
                    description: obj.description,
                    dueDate: (obj.dueDate.getMonth() + 1) + "/" + obj.dueDate.getDate() + "/" +  obj.dueDate.getFullYear(),
                    assigner: obj.assigner,
                    assignedStudents: strStudents,
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
                var obj, strStudents, numStudents, j, cleanedObj;
                obj = objects[i];
                strStudents = "";
                numStudents = obj.assignedStudents;
                for (j = 0; j < numStudents.length; j++) {
                    strStudents += numStudents[j] + ", ";
                }
                strStudents = strStudents.slice(0, -2);
                // The formatted object to be returned
                cleanedObj = {
                    title: obj.title,
                    description: obj.description,
                    dueDate: (obj.dueDate.getMonth() + 1) + "/" + obj.dueDate.getDate() + "/" +  obj.dueDate.getFullYear(),
                    assigner: obj.assigner,
                    assignedStudents: strStudents,
                    dateAssigned: (obj.dueDate.getMonth() + 1) + "/" + obj.dueDate.getDate() + "/" +  obj.dueDate.getFullYear(),
                    pointsPossible: obj.pointsPossible
                }
                list.push(cleanedObj);
            }
        }
        return list;
    }
});

// Gives user window scope over the Assignments collection
window.Assignments = Assignments;
