import { Groups } from '../../../collections/groups.js';
import { Student } from '../../../collections/student.js';
import { EasySearch } from 'meteor/easy:search';
import { Instructor } from '../../../collections/instructor.js';

Template.groups.onCreated(function() {
    Meteor.subscribe("Groups");
    Meteor.subscribe("Student");
    Meteor.subscribe("Coaches");
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
                groupId: group._id,
                size: group.size,
                leader: group.leader
            }
            formattedGroups.push(formattedGroup);
        }
        formattedGroups.sort(function(group1, group2) {
            return group1.name.localeCompare(group2.name);
        });
        return formattedGroups;
    },
    // IS THIS NEEDED? 18470296509716239486f120983hfc9weycnoasydnfco9ayeb09rcaw3bn4cq0n9374cb0n9a8sdfncauenr9c823094c71 98047cn9asufcjnlsfc
    namesInGroup: function() {
        if(document.getElementById("namesInGroup").style.height > 200) {
            document.getElementById("namesInGroup").style.overflowY = "scroll";
        }
    },
    groupIndex: function() {
        return groupIndex;
    }
});

Template.groups.events({
    'click #createGroupButton': function(event) {
        Modal.show("createGroupModal", event.target.id);
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
    },
    'change .filters': function (e) {
        groupIndex.getComponentMethods(/* optional name */)
            .addProps('grouptype', $(e.target).val())
        ;
    },
    'change .sorting': (e) => {
        groupIndex.getComponentMethods()
            .addProps('sortBy', $(e.target).val())
    }
});
