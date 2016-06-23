import {
	Meteor
}
from 'meteor/meteor';
Meteor.startup(() => {
	// code to run on server at startup

    UploadServer.init({
        tmpDir: process.env.PWD + '/.uploads/tmp',
        uploadDir: process.env.PWD + '/.uploads/'
    })

	Meteor.publish("Student", function() {
		return Student.find();
	});
	Meteor.publish("Teacher", function() {
		return Teacher.find();
	});
	//control update better
	Student.allow({
		update: function(userId, doc) {
			return true;
		}
	});
	Student.remove({});
	Instructor.remove({});
	for (var i = Student.find().count(); i < 5; i++) {
		Student.insert({
			"name": "ben" + i,
			"profilePicture": "x",
			"age": 5,
			"strengths": ['Input', 'Command', 'Restorative', 'Learner', 'Futuristic'],
			"description": "tall",
			"grade": '10th',
			"attendance": [true, false, true, true, false, false, true, true, false,
				true, true, false
			],
			"assignments": [{
				"name": "Java Work",
				"dateAssigned": new Date(),
				"dueDate": new Date(),
				"possiblePoints": 100,
				"pointsRecieved": 10,
				"instructor": "Zach"
			}, {
				name: "Java Work",
				dateAssigned: new Date(),
				dueDate: new Date(),
				possiblePoints: 100,
				pointsRecieved: 10,
				instructor: "Zach"
			}],
			"school": "West Dodge",
			"email": "ben@ben.com",
			"getHipYear": 2,
			"phoneNumber": '4026571179',
			"parentNames": ['Bill', 'Hillary'],
			"address": {
				"street": '3910 s 226th st.',
				"city": 'Elkhorn',
				"state": 'Nebraska',
				"zipCode": 68022
			},
			"github": 'Athletesrun',
			"blog": "http://blogger.com",
			"tshirtSize": "Small",
      "ep10": ["Responsibility", "Profitability", "Communication", "Strategic"]
		});
	}
	for (var i = Instructor.find().count(); i < 5; i++) {
		Instructor.insert({
			"name": "roger" + i,
			"profilePicture": "x",
			"strengths": ['Command', 'Relator', 'Fun', 'Cool', 'Nice'],
			"description": "Teacher",
			"email": "Teacher@teacher.com"
		});
	}
	console.log(Student.findOne({
		"name": "ben1"
	}));
	console.log(Instructor.findOne({
		"name": "roger1"
	}));
});
