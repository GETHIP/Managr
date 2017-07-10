import { Groups } from '../../../collections/groups.js';
import { Student } from '../../../collections/student.js';
import { EasySearch } from 'meteor/easy:search';
import { Instructor } from '../../../collections/instructor.js';

var alltypes = [];

Template.groups.onCreated(function() {
    Meteor.subscribe("Student");
    Meteor.subscribe("Coaches");
    this.autorun(function () {
        var subscription = Meteor.subscribe("Groups");
        if (subscription.ready()) {
            alltypes = [];
        }
    });
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
                groupType: group.groupType
            }
            formattedGroups.push(formattedGroup);
        }
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
    },
    uniquetypes: function(thisType) {
        result = true;
        for(var i = 0; i < alltypes.length; i++) {
            if(alltypes[i] == thisType) {
                result = false;
                break;
            }
        }
        if(result == true)
        {
            alltypes.push(thisType);
        }
        return result;
    },
    cleargrouptypes: function() {
        alltypes = [];
    }
});



Template.groups.events({
    'click #createGroupButton': function(event) {
        Modal.show("createGroupModal", event.target.id);
    },
    'click #suggestedgroupsbutton': function(event) {
        FlowRouter.go("/groups/createSuggested");
    },
    'click .editGroup': function(event) {
        event.preventDefault();
        const target = event.target;
        console.log(target);
        console.log(target.id);
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
