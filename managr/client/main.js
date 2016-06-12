import { Template } from 'meteor/templating';
//import { Assignments } from "../collections/assignments.js";
Template.single.helpers({
    assignments: function() {
        var a = Assignments.find().fetch();
        console.log(a);
        return a;
    }
});
