import { Meteor } from 'meteor/meteor';
import { Posts } from '../collections/blogPosts.js';
import { Comments } from '../collections/comments.js';
import { Assignments } from '../collections/assignments.js';
import { Instructor } from '../collections/instructor.js';
import { Student } from '../collections/student.js';
import { Drafts } from '../collections/drafts.js';
export function profilesMethods() {
	Meteor.methods({
		'addStudent': function(data){
			 data.id = Accounts.createUser({
					username: data[3],
					password: "G3tH1pPr0gram"
			 });
			 Roles.addUsersToRoles(data.id, 'Student');
			 Student.insert({
							"name": data[0],
							"userId": data.id,
							"school": data[1],
							"age": data[2],
							"email": data[3],
							"parentNames": data[4],
							"description": data[5],
							"grade": data[6],
							"getHipYear": data[7],
							"phoneNumber": data[8],
							"blog": data[9],
							"strengths": [undefined],
							"attendance": [false, false, false, false, false, false, false, false, false, false, false, false],
							"github": "blank",
							"tshirtSize": "blank",
							"blog": "blank",
							"ep10": [undefined],
							"picture": "blank",
							"address": {
									"street": data[10],
									"zipCode": 68055,
									"state": "blank",
									"city": "blank"
							}
			 });
		 },
	});
}