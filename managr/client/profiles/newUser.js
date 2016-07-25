
Template.newUser.events({
    'submit .newAccountForm'(e) {

        e.preventDefault();

        console.log(e.target.name.value);

        if(e.target.password.value === e.target.verify.value) {
            var data = {
                name: e.target.name.value,
                username: e.target.username.value,
                password: e.target.password.value,
                roles: e.target.role.value.toLowerCase()
            }

            Meteor.call('createUserAccount', {
                user: data
            })
            FlowRouter.go('/dashboard/');
        } else {
            alert('passwords must match');
        }
    }
})
