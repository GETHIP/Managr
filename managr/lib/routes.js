FlowRouter.route('/', {
	name: 'home',
	action() {
		BlazeLayout.render('blogsMain');
	}
})
FlowRouter.route('/blog', {
	name: 'blogs',
	action() {
		BlazeLayout.render('navbar', {main: 'home'})
	}
})
