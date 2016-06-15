FlowRouter.route('/', {
	name: 'home',
	action() {
		BlazeLayout.render('mainPage', {currentPage: 'blogMain'})
	}
})

FlowRouter.route('/testBlogs', {
	name: 'testdata',
	action() {
		BlazeLayout.render('testInsertData', {})
	}
})
