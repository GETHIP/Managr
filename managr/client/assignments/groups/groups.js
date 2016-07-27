import { Groups } from '../../../collections/groups.js';
import { Student } from '../../../collections/student.js';

Template.groups.onCreated(function() {
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

Template.groups.helpers({
    groups: function() {
        var allGroups = Groups.find({}).fetch();
        var formattedGroups = [];
        for(var i = 0; i < allGroups.length; i++) {
            var group = allGroups[i];
            var formattedGroup = {
                name: group.name,
                students: formatStudentsForGroup(group),
                groupId: group._id
            }
            formattedGroups.push(formattedGroup);
        }
        return formattedGroups;
    }
});

Template.groups.events({
    'click #backButton': function() {
        FlowRouter.go("/assignments");
    },
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
