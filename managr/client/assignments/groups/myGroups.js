import { Groups } from '../../../collections/groups.js';
import { Student } from '../../../collections/student.js';

Template.myGroups.onCreated(function() {
    Meteor.subscribe("Groups");
    Meteor.subscribe("Student");
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
                leader: group.leader
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