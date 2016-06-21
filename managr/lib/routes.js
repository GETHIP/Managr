FlowRouter.route('/', {
	name: 'home',
	action() {
		BlazeLayout.render('mainPage', {currentPage: 'blogMain'});
	}
})

FlowRouter.route('/blogs/:blog_id', {
	name: 'blogs',
	action : function(params) {
		BlazeLayout.render('mainPage', {currentPage: 'postPage'})
	}
})

FlowRouter.route('/testBlogs', {
	name: 'testdata',
	action() {
		BlazeLayout.render('testInsertData', {})
	}
})
