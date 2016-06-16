FlowRouter.route('/', {
	name: 'home',
	action() {
		BlazeLayout.render('blogMain');
	}
})

FlowRouter.route('/blogs/:blog_id', {
	name: 'blogs',
	action : function(params) {
    console.log("Individual blog post! ", FlowRouter.getParam("blog_id"));
		BlazeLayout.render('mainPage', {currentPage: 'blogMain'})
	}
})

FlowRouter.route('/testBlogs', {
	name: 'testdata',
	action() {
		BlazeLayout.render('testInsertData', {})
	}
})
