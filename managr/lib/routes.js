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
		BlazeLayout.render('blogMain');
	}
})
FlowRouter.route('/blog', {
	name: 'blogs',
	action() {
		BlazeLayout.render('navbar', {main: 'home'})
	}
})
