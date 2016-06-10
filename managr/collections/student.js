var Student = new Mongo.Collection('Student');

var StudentSchema = new SimpleSchema({
    "name": {
        "type": String,
        "label": 'Name'
    },
    "profilePicture": {
        "type": String,
        "label": 'Profile Picture'
        //autoValue: 'http://www.benwingerter.com/seizurefarm/resources/pictures/penguinNormal.png'
    },
    "age": {
        "type": Number,
        "label": 'Age'
    },
    "strengths": {
        "type": [String],
        "label": 'Strengths'
    },
    "description": {
        "type": String,
        "label": 'Description'
    },
    "grade": {
        "type": Number,
        "label": 'Grade'
    },
    "attendance": {
        "type": [String],
        "label": 'Attendance'
    },
    "assignments": {
        "type": [String],
        "label": 'Assignments'
    },
    "school": {
        "type": String,
        "label": 'School'
    }
});
Student.attachSchema(StudentSchema);
