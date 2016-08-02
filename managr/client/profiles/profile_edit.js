import { Student } from '../../collections/student.js';

Template.profileEdit.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('Student');
  });
});

Template.profileEdit.events({
	'change .uploadInput'(e) {
		e.preventDefault();
		var reader = new FileReader();
		var file = document.querySelector("input[type=file]").files[0];
		var result;

		reader.addEventListener("load", function () {

            var img = new Image();
            var canvas = document.getElementById('profileCanvas');
            var ctx = canvas.getContext('2d');

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            img.onload = function() {

                canvas.width = 100;
                canvas.height = 100;
                img.width = canvas.width;
                img.height = canvas.height;

                ctx.drawImage(img, 0, 0, 100, 100);

				var studentId = FlowRouter.getParam("id");
				Meteor.call('updateProfilePicture', studentId, canvas.toDataURL());
            }

            img.src = reader.result;

		}, false);

        reader.readAsDataURL(file);

	},
	'submit .profileEdit'(event) {
		event.preventDefault();
		
		let userId = FlowRouter.getParam("id");

		const email = event.target.email.value;
		const age = event.target.age.value;
		const school = event.target.school.value;
		const getHipYear = event.target.getHipYear.value;
		const grade = event.target.grade.value;
		const github = event.target.github.value;
		const name = event.target.name.value;
		const description = event.target.description.value;
		const phoneNumber = event.target.phoneNumber.value;
		const tshirtSize = event.target.tshirtSize.value;
		const blog = event.target.blog.value;
		const street = event.target.street.value;
		const city = event.target.city.value;
		const state = event.target.state.value;
		const zipCode = event.target.zipCode.value;
		const parentNames1 = event.target.parentNames1.value;
		const parentNames2 = event.target.parentNames2.value;
		const strength1 = event.target.strength1.value;
		const strength2	= event.target.strength2.value;
		const strength3 = event.target.strength3.value;
		const strength4 = event.target.strength4.value;
		const strength5 = event.target.strength5.value;
		const ep1 = event.target.ep1.value;
		const ep2 = event.target.ep2.value;
		const ep3 = event.target.ep3.value;
		const ep4 = event.target.ep4.value;
		
		if (name == "") {
			Modal.show('missingFields', 'Name field is required.');
			return;
		}

		var data = {
			email: email,
			age: age,
			school: school,
			getHipYear: getHipYear,
			grade: grade,
			github: github,
			name: name,
			description: description,
			phoneNumber: phoneNumber,
			tshirtSize: tshirtSize,
			blog: blog,
			address: {
				street: street,
				city: city,
				state: state,
				zipCode: zipCode
			},
			strengths: [strength1, strength2, strength3, strength4, strength5],
			ep10: [ep1, ep2, ep3, ep4],
			parentNames: [parentNames1, parentNames2]
		};

    Meteor.call('updateStudent',userId, data);
    FlowRouter.go("/profile/" + userId);
  }
});

Template.profileEdit.helpers({
  data: function() {
    let userId = FlowRouter.getParam("id");
    let data = Student.findOne({"_id": userId});
    return data;
  },
  specificFormData: function(){
    return {id: FlowRouter.getParam("id")}
  }
});
