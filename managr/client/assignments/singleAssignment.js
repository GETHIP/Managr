import { Assignments } from '../../collections/assignments.js';
import { Student } from '../../collections/student.js';

Template.singleAssignment.onCreated(function() {
    Meteor.subscribe('Assignments', function() {
        var assignment = Assignments.findOne({_id: FlowRouter.getParam("id")});
        if(assignment == undefined) {
            FlowRouter.go("/assignments");
        }
    });
    Meteor.subscribe('Student');
});

Template.singleAssignment.helpers({
    assignments: function() {
      var assignment = Assignments.findOne({_id: FlowRouter.getParam("id")});

			if (assignment != undefined) {
        var formattedAssignment;
        formattedAssignment = {
            title: assignment.title,
            description: assignment.description,
            dueDate: moment(assignment.dueDate).format("MM/DD/YYYY"),
            assigner: assignment.assigner,
            dateAssigned: moment(assignment.dateAssigned).format("MM/DD/YYYY"),
            pointsPossible: assignment.pointsPossible
        }
        return formattedAssignment;
			}
    },
    completed: function() {
        var studentAssignment = findStudentAssignment();
        if(studentAssignment == undefined) return false;
        return studentAssignment.completed;
    }
});

Template.singleAssignment.events({
    'click #submitAssignment': function(event){
        Modal.show('submitAssignmentModal');
    }
});

var findStudentAssignment = function() {
    var assignmentId = FlowRouter.getParam("id");
    var student = Student.findOne({userId: Meteor.user()._id});
    var studentAssignments = student.assignments;
    for(var i = 0; i < studentAssignments.length; i++) {
        if(studentAssignments[i].assignmentId == assignmentId) {
            return studentAssignments[i];
        }
    }
    return undefined;
}

Template.submitAssignmentModal.onCreated(function() {
    Meteor.subscribe('Assignments')
    Meteor.subscribe('Student');
});

Template.submitAssignmentModal.helpers({
    assignmentUrl: function() {
        var studentAssignment = findStudentAssignment();
        if(studentAssignment == undefined) return "";
        return studentAssignment.link;
    }
});

Template.submitAssignmentModal.events({
    'submit #confirmDeleteAssignment':function(event) {
        event.preventDefault();
        const form = event.target;

        $('#modal').modal('hide');

        var assignmentId = FlowRouter.getParam("id");
        var assignmentUrl = form.assignmentUrl.value;
        Meteor.call("submitAssignment", assignmentId, assignmentUrl);

        FlowRouter.go("/assignments");
    }
});
