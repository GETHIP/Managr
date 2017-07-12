import { Groups } from '../../../collections/groups.js';
import { Student } from '../../../collections/student.js';
import { Instructor } from '../../../collections/instructor.js';

Template.myGroups.onCreated(function() {
    Meteor.subscribe("Groups");
    Meteor.subscribe("Student");
    Meteor.subscribe("Instructor");
});

var formatStudentsForGroup = function(group) {
    var studentIds = group.studentIds;
    var formattedStudents = [];

    for(var i = 0; i < studentIds.length; i++) {
        var student = Student.findOne({_id: studentIds[i]});
        if(student == undefined) {
            continue;
        }
        var formattedStudent = {
            name: student.name
        }
        formattedStudents.push(formattedStudent);
    }
    return formattedStudents;
}

Template.myGroups.helpers({
    groups: function() {
        var studentID = Student.findOne({userId: Meteor.user()._id});
        var studentName = studentID._id;
        var allGroups = Groups.find({ studentIds: studentName }).fetch();
        var formattedGroups = [];
        for(var i = 0; i < allGroups.length; i++) {
            var group = allGroups[i];
            var formattedGroup = {
                name: group.name,
                students: formatStudentsForGroup(group),
                groupId: group._id,
                size: group.studentIds.length,
                coachNames: group.coachNames
            }
            formattedGroups.push(formattedGroup);
        }
        formattedGroups.sort(function(group1, group2) {
            return group1.name.localeCompare(group2.name);
        });
        return formattedGroups;
    },
    namesInGroup: function() {
        if(document.getElementById("namesInGroup").style.height > 200) {
            document.getElementById("namesInGroup").style.overflowY = "scroll";
        }
    },
    grouptypes: function(type) {
        if(!type || type == 0 || type == null) {
            return "None";
        } else {
          return type;
        }
    },
    allCoaches: function(coaches) {
        console.log(coaches);
        if(!coaches || coaches.length == 0) {
          return "None";
        }
        var allCoaches = [];
        for(var i = 0; i < coaches.length; i++) {
            var coach = coaches[i];
            allCoaches.push(coach);
        }
        return allCoaches.join(", ");
    }
});

Template.myGroups.events({
    'click #createGroupButton': function() {
        FlowRouter.go("/groups/create");
    },
    'click .editGroup': function(event) {
        event.preventDefault();
        const target = event.target;
        FlowRouter.go("/groups/edit/" + target.id);
    },
    'click .deleteGroup': function(event) {
        event.preventDefault();
        const target = event.target;
        Meteor.call("removeGroup", target.id);
    }
});
