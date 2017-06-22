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
        /**currentValue.url2 = "/groups/" + group._id;
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
        }**/
        Groups.forEach(function(currentValue, index, group){
          currentValue.url2 = "/groups/" + currentValue._id;

          GroupsTable.push(currentValue);
        });
        formattedGroups.sort(function(group1, group2) {
            return group1.name.localeCompare(group2.name);
        });
        return formattedGroups;
    },
    groupIndex: function() {
        return groupIndex;
    },
    allcoaches: function(coaches) {
        if(!coaches) {
          return;
        }
        var allCoaches = [];
        for(var i = 0; i < coaches.length; i++) {
            allCoaches.push(coaches[i].name);
        }
        return allCoaches.join(", ");
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
    'change .filters': function (e) {
        groupIndex.getComponentMethods(/* optional name */)
            .addProps('grouptype', $(e.target).val())
        ;
    },
    'change .sorting': (e) => {
        groupIndex.getComponentMethods()
            .addProps('sortBy', $(e.target).val())
    },
    'click .realDeleteGroupButton':function(e) {
        /*var user = Meteor.users.findOne({username: e.target.id});*/
        /*var asdf = group.name;*/
        var group = Groups.findOne({_id: e.target.id});
		    Modal.show('deleteGroupModal', group);
    },
    'click .groupRow': function(event) {
        event.preventDefault();
        const target = event.target;
        FlowRouter.go("/groups/" + event.target.id);
    }
});
