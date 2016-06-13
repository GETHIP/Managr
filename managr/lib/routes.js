FlowRouter.route('/', {
	name: 'home',
	action() {
		BlazeLayout.render('navbar', {main: 'home'})
	}
})
FlowRouter.route('/blog', {
	name: 'blogs',
	action() {
		BlazeLayout.render('navbar', {main: 'home'})
	}
})
