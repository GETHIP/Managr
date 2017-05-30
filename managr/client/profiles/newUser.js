
Template.newUser.onCreated(function() {
	Meteor.subscribe('userData');
});

Template.newUser.events({
    'submit .newAccountForm'(e) {
        e.preventDefault();

		if (Meteor.users.findOne({username: e.target.username.value}) != undefined) {
			Modal.show('warningModal', {
				title: 'Error',
				text: 'The username "' + e.target.username.value + '" is already taken.',
				confirmText: 'Dismiss',
				confirmCallback: () => {}
			});
			return;
		}

		if (e.target.password.value !== e.target.verify.value) {
			Modal.show('warningModal', {
				title: 'Error',
				text: 'The passwords do not match.',
				confirmText: 'Dismiss',
				confirmCallback: () => {}
			});
			return;
		}

		if (e.target.name.value == "") {
			Modal.show('warningModal', {
				title: 'Error',
				text: 'The name field cannot be blank.',
				confirmText: 'Dismiss',
				confirmCallback: () => {}
			});
			return;
		}

		if (e.target.username.value == "") {
			Modal.show('warningModal', {
				title: 'Error',
				text: 'The username field cannot be blank.',
				confirmText: 'Dismiss',
				confirmCallback: () => {}
			});
			return;
		}

		//We don't have to check verify password because
		//we already check if the two fields are equal,
		//which they can't be if password exists but verify doesn't.
		if (e.target.password.value == "") {
			Modal.show('warningModal', {
				title: 'Error',
				text: 'The password field cannot be blank.',
				confirmText: 'Dismiss',
				confirmCallback: () => {}
			});
			return;
		}

		var data = {
			name: e.target.name.value,
			username: e.target.username.value,
			password: e.target.password.value,
			roles: e.target.role.value.toLowerCase()
		}

		Meteor.call('createUserAccount', data);
		FlowRouter.go('/dashboard');
    },
	'click #cancelButton':function(event) {
		event.preventDefault();
		FlowRouter.go('/dashboard');
	}
})
