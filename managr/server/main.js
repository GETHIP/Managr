import { Meteor } from 'meteor/meteor';
var fs = Npm.require('fs');

Meteor.startup(() => {
	// code to run on server at startup

    const path = '/../../../../../public/images/';

    UploadServer.init({
        tmpDir: (process.env.PWD || process.cwd()) + path + 'tmp/',
        uploadDir: (process.env.PWD || process.cwd()) + path,
        checkCreateDirectories: true,
        finished: function(fileInfo, formFields) {
            if(fileInfo.type === "application/vnd.ms-excel"){
              var data = fs.readFileSync((process.env.PWD || process.cwd()) + path + fileInfo.name).toString();
              Papa.parse(data, {
                complete: function(data){
                    console.log(data.data);
                    data = data.data;
                    for(i=1;i<data.length-1;i++){
                        Student.insert({
                          "name": data[i][0],
                          "school": data[i][1],
                          "age": data[i][2],
                          "email": data[i][3],
                          "parentNames": data[i][4].split(" and "),
                          "description": data[i][5],
                          "grade": data[i][6],
                          "getHipYear": data[i][7],
                          "phoneNumber": data[i][8],
                          "blog": data[i][9],
                          "strengths": [undefined],
                          "attendance": [undefined],
                          "assignments": [undefined],
                          "github": "blank",
                          "tshirtSize": "blank",
                          "blog": "blank",
                          "ep10": [undefined],
                          "picture": "blank",
                          "address": {
                            "street": data[i][10],
                            "zipCode": 68055,
                            "state": "blank",
                            "city": "blank"
                          }
                        });
                    }
                }
              });
                return;
            }
            var fileTypes = ['image/gif', 'image/jpg', 'image/jpeg', 'image/png', 'image/svg+xml'];
            var fileExtensions= ['.gif', '.jpg', '.jpeg', '.png', '.svg'];

            var extension;

            for(var i in fileTypes) {
                if(fileInfo.type === fileTypes[i]) {
                    extension = fileExtensions[i];
                    console.log(fileExtensions[i]);
                }
            }

            Student.update({_id: formFields.id}, {$set: {picture: formFields.id + extension}});

            fs.rename((process.env.PWD || process.cwd()) + path + fileInfo.name,
                (process.env.PWD || process.cwd()) + path + formFields.id + extension,
                function(stuff) {
                    console.log((process.env.PWD || process.cwd()) + path + fileInfo.name);
                    console.log((process.env.PWD || process.cwd()) + path + formFields.id + extension);
                    console.log('trying to rename file');
                    console.log(stuff);
                });
        },
        acceptFileTypes: /(\.|\/)(gif|jpe?g|png|svg|csv)$/i
    });
	studentIndex = new EasySearch.Index({
		name: "studentIndex",
		collection: Student,
    fields: ['name'],
    engine: new EasySearch.Minimongo({
			transform: function (doc){
				doc.url = "/profile/" + doc._id;
				for(i in doc.attendance){
						if(doc.attendance[i] == true){
								doc.attendance[i] = "green";
						}
						if(doc.attendance[i] == false){
								doc.attendance[i] = "red";
						}
				}
        console.log(doc.attendance);
				doc.parentNames = doc.parentNames.join(" and ");
				return doc;
			}
		}),
		permission: function(){
			return true;
		}
  });
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
			"name": "Dash Wedergren " + i,
			"age": 16,
			"strengths": ['Input', 'Command', 'Restorative', 'Learner', 'Futuristic'],
			"description": "Programmer",
			"grade": '10',
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
			"school": "Mount Michael",
			"email": "dash_wedergren@gallup.com",
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
            "ep10": ["Responsibility", "Profitability", "Communication", "Strategic"],
            "picture": '8710339dcb6814d0d9d2290ef422285c9322b7163951f9a0ca8f883d3305286f44139aa374848e4174f5aada663027e4548637b6d19894aec4fb6c46a139fbf9.jpg'
		});
	}
	for (var i = Instructor.find().count(); i < 5; i++) {
		Instructor.insert({
			"name": "Zach Merrill " + i,
			"strengths": ['Command', 'Relator', 'Analytical', 'Learner', 'Responsibility'],
			"description": "Teacher",
			"email": "zach_merrill@gallup.com",
            "picture": '8710339dcb6814d0d9d2290ef422285c9322b7163951f9a0ca8f883d3305286f44139aa374848e4174f5aada663027e4548637b6d19894aec4fb6c46a139fbf9.jpg'
		});
	}

	console.log(Student.findOne({
		"name": "Dash Wedergren 1"
	}));
	console.log(Instructor.findOne({
		"name": "Zach Merrill 1"
	}));
});
