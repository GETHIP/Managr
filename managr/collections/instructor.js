export const Instructor = new Mongo.Collection('Instructor');

var InstructorSchema = new SimpleSchema({
    name: {
        type: String,
        label: 'Name'
    },
    profilePicture: {
        type: String,
        label: 'Profile Picture'
    },
    strengths: {
        type: [String],
        label: 'Strengths'
    },
    description: {
        type: String,
        label: 'Description'
    },
    email: {
        type: String,
        label: 'Email'
    }
});
Instructor.attachSchema(InstructorSchema);
