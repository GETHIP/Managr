// Import meteor for server / publish and Assignments to publish
import { Meteor } from 'meteor/meteor';
import { Posts } from '../collections/blogPosts.js';
import { Comments } from '../collections/comments.js';
import { Assignments } from '../collections/assignments.js';
import { Instructor } from '../collections/instructor.js';
import { Student } from '../collections/student.js';

function createDefaultUser() {
	var users = Meteor.users.find({username: "admin"}).fetch();
	if (users.length > 0) {
		return;
	}

	var adminId = Accounts.createUser({
		username: "admin",
		password: "Gallup2016"
	});
	Roles.addUsersToRoles(adminId, ['instructor']);
	Instructor.insert({
		"name": "Admin",
		"profilePicture": "x",
		"strengths": ['Arranger', 'Woo', 'Communication', 'Maximizer', 'Activator'],
		"description": "Admin",
		"email": "x",
		"userId": adminId
	});
}
var fs = Npm.require('fs');

Meteor.startup(() => {
	// code to run on server at startup
	createDefaultUser();

  studentIndex = new EasySearch.Index({
		name: "studentIndex",
		collection: Student,
    fields: ['name'],
    engine: new EasySearch.Minimongo({
			transform: function (doc){
				doc.url = "/profile/" + doc._id;
				for(i in doc.attendance){
						if(doc.attendance[i] === true){
								doc.attendance[i] = "Present";
						}
						if(doc.attendance[i] === false){
								doc.attendance[i] = "Absent";
						}
				}
				doc.attendance = doc.attendance.join(" | ");
				doc.parentNames = doc.parentNames.join(" and ");
				return doc;
			}
		}),
		permission: function(){
			return true;
		}
  });
  Meteor.publish("Comments", function(){
    return Comments.find();
  });
  Meteor.publish("Posts", function(){
		var isValid = true;
    if(!this.userId){
      isValid = false;
    }
    else if(Roles.userIsInRole(this.userId, 'unconfirmed')){
      isValid = false;
    }
		if(isValid){
    	return Posts.find();
		}
		else{
			return Posts.find({isPublic: true});
		}
  });
  Posts.allow({
    'insert': function(userId, doc) {
      true;
    },
    'update': function(userId, doc){
      true;
	}
  });

  Meteor.methods({
    'insertPost':function(post) {
			console.log(post);
      Posts.insert(post);
      console.log(Posts.find().fetch());
    },
    'updateComment': function(authorName, postId, authorId, commentText){
			if(!userIsValid()){

				return ;
			}
		 Posts.update({_id: postId },
        {
          $push: { comments:
            {
              text: commentText,
              authorId: authorId,
              date: new Date(),
              authorName: authorName
            }
          }
        });
    },
	'testCreatePosts': function() {
		var jimId = Meteor.users.findOne({username: "jim"})._id;
		var jimName = "Jim";
		var instructorId = Meteor.users.findOne({username: "instructor"})._id;
		var jimName = Instructor.findOne({userId: jimId}).name;
		var instructorName = "Zach";

		var i = 0;
		var dates = [
			new Date(2016, 1, 1),
			new Date(2016, 2, 1),
			new Date(2016, 3, 1),
			new Date(2015, 1, 1),
			new Date(2015, 2, 1),
			new Date(2015, 3, 1),
			new Date(2014, 1, 1),
			new Date(2014, 2, 1),
			new Date(2014, 3, 1),
			new Date(2013, 1, 1)
		];
    console.log(dates);
		for (i = 1; i <= 10; i++) {
			var id = jimId;
			var name = jimName;
			var otherId = instructorId;
			var otherName = instructorName;
			var isPublic = true;
			if (i % 2 == 0) {
				id = instructorId;
				name = instructorName;
				otherId = jimId;
				otherName = jimName;
				isPublic = false;
			}
			Posts.insert({
				title: "Title " + i,
				text: "Text of the blog post.\n\n\n\nEnd of blog post.",
				authorId: id,
				authorName: name,
				date: dates[i - 1],
				isPublic: isPublic,
				comments: [
					{
						text: "Comment.",
						authorId: otherId,
						authorName: otherName,
						date: dates[i - 1]
					},
          {
            text: "Comment.",
						authorId: jimId,
						authorName: jimName,
            date: dates[i - 1]
          },
          {
            text: "Comment.",
						authorId: otherId,
						authorName: otherName,
            date: dates[i - 1]
          }
				]
			});
		}

    },
	'testCreateUsers': function() {
		var instructorId = Accounts.createUser({
			username: "instructor",
			password: "password",
		});
		var jimId = Accounts.createUser({
			username: "jim",
			password: "password",
		});
		var studentId = Accounts.createUser({
			username: "student",
			password: "password",
		});

		Roles.addUsersToRoles(instructorId, 'instructor');
		Roles.addUsersToRoles(jimId, 'instructor');
		Roles.addUsersToRoles(studentId, 'student');

		Instructor.insert({
			"name": "Jim Collison",
			"profilePicture": "x",
			"strengths": ['Arranger', 'Woo', 'Communication', 'Maximizer', 'Activator'],
			"description": "Teacher",
			"email": "Teacher@teacher.com",
			"userId": jimId
		});
		Instructor.insert({
			"name": "Zach",
			"profilePicture": "x",
			"strengths": ['Arranger', 'Woo', 'Communication', 'Maximizer', 'Activator'],
			"description": "Teacher",
			"email": "Teacher@teacher.com",
			"userId": instructorId
		});
		Student.insert({
			"name": "Dash Wedergren " + i,
			"age": 16,
			"strengths": ['Input', 'Command', 'Restorative', 'Learner', 'Futuristic'],
			"description": "Programmer",
			"grade": '10',
			"attendance": [true, false, true, true, false, false, true, true, false,
				true, true, false
			],
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
			"userId": studentId,
            "ep10": ["Responsibility", "Profitability", "Communication", "Strategic"],
            "picture": 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAEsASwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD6oooor9gPhAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKxtd8ZaJ4aBGpanb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'
		});
	},
	'createDefaultUser': function() {
		createDefaultUser();
	},
	'addStudent': function(user){
		console.log(user.username);
		console.log(user.id);
		 user.id = Accounts.createUser({
				username: user.username,
				password: user.password
		 });
		 Roles.addUsersToRoles(user.id, 'Student');
		 console.log(user.id);
		 Session.set("userId", user.id);
	}
  });
    Meteor.publish('Assignments', function() {
        return Assignments.find();
    });

    UploadServer.init({
        tmpDir: process.env.PWD + '/.uploads/tmp',
        uploadDir: process.env.PWD + '/.uploads/'
    })

	Meteor.publish("Student", function() {
		return Student.find();
	});
	Meteor.publish("Instructor", function() {
		return Instructor.find();
	});
	//control update better
	Student.allow({
		update: function(userId, doc) {
			return true;
		}
	});

		for (var i = Student.find().count(); i < 5; i++) {
			Student.insert({
				"name": "ben" + i,
				"picture": "x",
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
		  	"ep10": ["Responsibility", "Profitability", "Communication", "Strategic"],
				"userId": "asdof889a"
			});
		}
	for (var i = Instructor.find().count(); i < 5; i++) {
		Instructor.insert({
			"name": "Zach Merrill " + i,
			"strengths": ['Command', 'Relator', 'Analytical', 'Learner', 'Responsibility'],
			"description": "Teacher",
			"email": "zach_merrill@gallup.com",
            "picture": 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAEsASwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD6oooor9gPhAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKxtd8ZaJ4aBGpanb20g/5Zbt0h/4CuTXFah8f9BtmK2tnfXuP4tqxKfzOf0rpp4atV1hFszlUhHdnp1FeNv+0VHu+XQHI/2roZ/9Bqe2/aJsWbFxolzGPWKdG/QgVu8vxK+x+K/zI9vT7nrtFcPpHxl8Laqyo169hI3AW8jKD/voZH612lvcw3kCzQSxzwt92SJgyn6EcVyVKVSk7Ti0axlGWzJKKKKyKCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAoorlvH/j208C6WJZAJ76YEW1rnG8/3m9FHc/gKuEJVJKEFdsTairs0fE/i3TPCFh9q1K4EYbIjiXmSU+ir3+vQV4V4v8AjNrXiJnhsXOkWJ42QN+9cf7T/wBBj8a47XNdvvEmpS32oTtcXEnc8BR2VR2A9KoV9Zhcvp0VzT1l+B5lSvKei0QMxZmZiWZuSx5J+pooor1jmCiiigArT0HxLqnhm4E2mXsto2clUOUb/eU8H8RWZRSlFSVpK6Gm1qj3zwP8b7PWXjs9cVNOvGwq3KnEEh98/cP6e4r1HrXxlXp3wu+LEnh+SLStYlaXSmIWKdjlrY+/qn8u3FfPYvLUk6lD7v8AL/I7aWI+zM9/opFYOoZSGUjIIOQR60tfOHeFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAUNe1q28O6RdaleNtt7dN7AdWPZR7k4FfKvibxHeeK9ZuNSvWzLKcKgPyxoPuoPYf4mvR/j74qNzqNtoML/urYCe4A7yEfKD9F5/4FXklfWZZhlTp+1lvL8v8Agnm4ipzS5Vsgooor2TkCiiigAooooAKKKKACiiigD2z4HePWuFHhu+k3OilrKRjyVHJj/DqPbI7CvYa+OLG9n029gu7ZzFcQOJI3HZgcivrXw3rkXiXQbHU4eEuYg5X+63Rl/AgivlMzwypTVWO0vz/4J6WHqcy5X0NKiiivFOsKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACmySLDG0jnCICzH0AGTTqwPH96dP8Ea5Opwy2jqp92G3+tXCPPJR7ibsrny/r2rSa7rV9qMpJe6meXnsCeB+AwKo0mMcelLX6CkoqyPD33CiiimAUUUUAFFFFABRRRQAUUUUAFe5/s+a0Z9I1PS3bJtpVnjB7K4w3/jw/WvDK9H+At4bfxvJDn5bi0kUj1KlWH8jXBj4c+Hl5a/cb0Xaoj6Gooor4k9YKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACuR+LOf+Fda5j/nkv8A6GtddWD48sTqXgvW7dRlmtJCo9wNw/lW1B8tWDfdfmTPWLPlA9aKQHIB9eaWvvzxAooooAKKKKACiiigAooooAKKKKACu5+Cmf8AhYthj/nlNn/vg1w1ekfASyNx41mnx8ttZuxPuxCj+tcmLdsPN+TNKWs0fQtFFFfCnshRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUjosisjjKMMMPUHrS0UAfIfiPR38P6/qGnSDBtp2jHuuflP4gis6vYfj74VMdza+IIE+SQC3ucDow+4x+oyPwFePV95hqyr0oz+/1PGqQ5JNBRRRXSZhRRRQAUUUUAFFFFABRRRQAV7v+z9ohtdD1DVHXDXcwijPqiDn/wAeJ/KvEdM0241jUbaxtU8y5uJBHGvue/0HX8K+tdA0aHw9otlptv8A6q2iEYP949z+JyfxrxM1rKNJUlu/yR14aN5c3Yv0UUV8qekFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQBT1fSrbXdMudPvE8y2uEMbr3x6j3B5H0r5W8W+Frvwfrk+nXYLbfmimxgSxnow/qOxzX1rXO+OPBNl440k2tx+6uI8tb3IGWib+qnuP616eBxf1adpfC/6uc9al7RXW58qUVqeI/DWoeFNTex1GAxSjlWHKSL/eU9x/k1l19jGSklKLujy2raMKKKKYgooooAKKKKACik6CvWfhZ8JJNSkh1jXIDHZDDwWcgwZj2Zx2X27/AE64V68MPDnmy4Qc3ZG38EfALabb/wDCQ38ZW5nTbaRsOUjPVz7t29vrXrVHSiviK9aVeo6kj14QUI8qCiiisCwooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigDM8Q+G9O8U6e1nqVstxCeVPRoz/eVuoNeHeL/ghq2is8+k51eyHOxQBOg91/i+q/lX0JRXbh8XVw3wPTsZTpRqbnxpLE8ErRSo0cqnDI6lWH1B5ptfXes+GtK8Qpt1LT7e97BpYwWH0bqPzri9Q+A/hq7JNub2xJ7RTb1H4MD/ADr3aebUpfGmvxOKWGktmfPFFe4yfs7WBb5Ncu1HobdD/UVPa/s9aPGQZ9Uvpx6KqR/0NdDzLDfzfgyPq9TseD1s+HPB2seK5gmmWMk6Zw0xG2Jfq54r6F0j4TeFtGZXj0tbqUfx3jGU/keP0rrY0WKNURVRF4VVGAPoBXFVzZbUo/ebRwz+0zznwN8F9P8ADjx3mqMmp6guGVSv7mI+oB+8fc/lXpFFFeBVrTrS5qjuztjBQVohRRRWJQUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFA5PHJpk88Vsu6aVIV9ZGCj9aAH0Vi3XjXw/ZEifW7CMjsbhSf0NZ0vxW8IxHB162Y/7Adv5LWyo1ZbRf3Mlzit2dXRXGn4weEB/zGFP0gk/+Jpy/F7wg/8AzGUH+9FIP/Zar6vW/kf3MXtId0dhRXMQfE3wpcnCa/ZZ9HYr/MCtW08SaRf4FtqllOT2S4Q/1qHSqR+KLXyGpRezNKihfnXK/MPVeRRWRQUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRVXUtTtNHs5Lu+uY7S2T70srYA/wAT7Cmk27INi1UV1dQWMDT3M0dvCvWSVwqj8TXj3iz4+4L2/h61BHT7bdr+qp/8V+VeT6zr+peIbgz6lezXsnbzWyq/Reg/AV7FDLKtTWp7q/E5Z4iMfh1Pf9c+N3hrSSyW8suqzDtarhP++2wPyzXB6v8AtA6xdFl06xtbBD0aXMz/ANB+leW0V7NPLsPT3V35/wBWOSVecutjo9T+I3ibViftGt3YQ/8ALOF/KX8lxXPzzSXTlppHmY9WkYsf1plFehGEIaQSRg23uIAB0AH0pcn1ooqxBmjNFFABmkKqeqg/hS0UAWrLVb3TmDWl5cWpHeGZl/ka6bTPi74r0zAGqtdoP4bxFl/U8/rXH0VlOlTqfHFP5FKUo7M9j0f9oaVSq6rpCuO8tnJtP/fLf413+g/FHw14hKpBqKW87dILweU2fQZ4P4Gvl2kPIweRXnVcsoT+H3X5G8cRNb6n2d2B7Hke9FfKvhr4ha94UZRY3ztbg82s/wC8iP4Hp+GK9i8IfG7SddaO31RRpF43AZ2zA59m/h/4F+deJXy6tR1j7y8v8jrhXhLR6HpFFICGAIIIIyCOhFLXlnSFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRXMfEHxtD4H0JrohZbyUmO2gY/ffHU/wCyOp/Ad6uEJVJKEVqxNqKuyLx78RdP8DWoEg+1ajIuYbRWwT/tMf4V/U9q+dvE/i3U/F999q1K4MpH+rhXiOIeir2+vU1Q1LUrrV7+e9vJmuLqZt8kj9Sf6D27VWr7LC4OGGV95d/8jyqlV1H5BRRRXoGAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAHb+AvipqXg2SO2lLX+k5wbZ2+aMesZPT6dD7V9D6Hrtj4j02K/0+cXFtJ0YcFT3Vh2I9K+Qa6j4feOrnwPrAmBaXT5iFurcfxL/eH+0O3r0rx8bgI1k501aX5/8E6qVZw0lsfUtFRWl3Df2sNzbyLLBMgkjkXoykZBqWvktj0wooooAKKKKACiiigAooooAKKKKACiiigAxk4r5j+LPiVvEnjO82vutLMm1gHbCn5j+LZ/IV9NSOY43cdVUsPwGa+NZHMsjuxyzMWJ9yc172U005ym+n6/8McWJlZJCUUUV9OeeFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAHvXwC8Qvf6FeaTM25rFw8Wf+eb54/Bgfzr1OvAf2fZGXxdfxg/K1iSR9JEx/M179XxmYQUMRK3XU9ag700FFFFeabhRRRQAUUUUAFFFFABRRRQAUUUUAR3H/HvL/uN/I18aivsq4/495f9xv5GvjUV9Hk//Lz5fqcGK3iLRRRX0RwhRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQB6Z+z9/yOd7/ANeD/wDoxK+ga+fv2fv+Rzvf+vB//RiV9A18hmn+8P0R6mH+AKKKK8k6QooooAKKKKACiiigAooooAKKKKAI7j/j3l/3G/ka+NRX2Vcf8e8v+438jXxqK+jyf/l58v1ODFbxFooor6I4QooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA9M/Z+/5HO9/wCvB/8A0YlfQNfP37P3/I53v/Xg/wD6MSvoGvkM0/3h+iPUw/wBRRRXknSFFFFABRRRQAUUUUAFFFFABRRRQBHcf8e8v+438jXxqK+yrj/j3l/3G/ka+NRX0eT/APLz5fqcGK3iLRRRX0RwhRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQB6Z+z9/yOd7/wBeD/8AoxK+ga+fv2fv+Rzvf+vB/wD0YlfQNfIZp/vD9Eeph/gCiiivJOkKKKKACiiigAooooAKKKKACiiigCO4/wCPeX/cb+Rr41FfZVx/x7y/7jfyNfGor6PJ/wDl58v1ODFbxFooor6I4QooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA9M/Z+/wCRzvf+vB//AEYlfQNfP37P3/I53v8A14P/AOjEr6Br5DNP94foj1MP8AUUUV5J0hRRRQAUUUUAf//Z'
		});
	}
});
