Assignments = new Meteor.Collection('Assignments');

AssignmentSchema = new SimpleSchema({
    title: {
        type: String,
        label: "Title"
    },
    description: {
        type: String,
        label: "Description"
    },
    dueDate: {
        type: Date,
        label: "Due Date",
        autoValue: function {
            return new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000);
        }
    },
    assigner: {
        type: String,
        label: "Assigner"
    },
    assignedStudents: {
        type: [Number],
        label: "Assigned Students"
    },
    dateAssigned: {
        type: String,
        label: "Date Assigned",,
        autoValue: function {
            return new Date();
        }
    },
    pointsPossible: {
        type: Number,
        label: "Points Possible",
        autoValue: function {
            return 10;
        }
    }
});

Assignments.attachSchema(AssignmentSchema);
