if(Meteor.isClient) {
	Accounts.onLogout(function() {
		FlowRouter.go('login');
	});
	Accounts.onLogin(function() {
		FlowRouter.go('home');
	});
}

var main = "main"
var blogLayout = "blogLayout"
var blogsSection = FlowRouter.group({
	name: "blogs",
	prefix: ""
});
// Used by all URLs beginning with /assignments
var assignmentSection = FlowRouter.group({
	name: "assignments",
    prefix: "/assignments"
});
var profileSection = FlowRouter.group({
	name: "profiles",
	profiles: "/profiles"
});
var attendanceSection = FlowRouter.group({
	name: "attendance",
	profiles: "/attendance"
});

var surveysSection = FlowRouter.group({
	name: "surveys",
	prefix: "/surveys"
});

blogsSection.route('/home', {
	name: 'home',
	action() {
		BlazeLayout.render(blogLayout, {content: 'blogMain'});
	}
});
blogsSection.route('/', {
	name: 'homeRedirect',
	action() {
		FlowRouter.go('/home')
	}
});
blogsSection.route('/login', {
	name: 'login',
	action() {
		BlazeLayout.render(blogLayout, {content: 'blogMain'});
	}
});

blogsSection.route('/home/blogs/:blog_id', {
	name: 'blogs',
	action : function(params) {
		BlazeLayout.render(blogLayout, {content: 'postPage'})
	}
});
blogsSection.route('/home/managePosts', {
	name: 'managePosts',
	action : function(params) {
		BlazeLayout.render(blogLayout, {content: 'manage'})
	}
});
blogsSection.route('/home/editPost/:blog_id', {
	name: 'editPost',
	action : function(params) {
		BlazeLayout.render(blogLayout, {content: 'editPost'})
	}
});
blogsSection.route('/editDraft/:draft_id', {
	name: 'editDraft',
	action : function(params) {
		BlazeLayout.render(blogLayout, {content: 'editDraft'})
	}
});
assignmentSection.route("/", {
    name: "allAssignments",
    action() {
        BlazeLayout.render("assignmentLayout", {content: "assignmentsHome"});
    }
});
// Information on a single assignment
assignmentSection.route("/single/:id", {
    name: "singleAssignment",
    action(params) {
        BlazeLayout.render("assignmentLayout",{
            content: "singleAssignment"
        });
    }
});

//this is a temp route
assignmentSection.route("/single/admin/:id", {
    name: "adminSingleAssignment",
    action(params) {
        BlazeLayout.render("assignmentLayout",{
            content: "adminSingleAssignment"
        });
    }
});

assignmentSection.route("/edit/single/admin/:id", {
    name: "editSingleAssignment",
    action(params) {
        BlazeLayout.render("assignmentLayout",{
            content: "editSingleAssignment"
        });
    }
});
assignmentSection.route('/edit/new', {
    name: "newAssignment",
    action(params) {
        BlazeLayout.render("assignmentLayout", {
            content: "newAssignment"
        });
    }
});

assignmentSection.route('/grades', {
    name: "viewAllGrades",
    action() {
        BlazeLayout.render("assignmentLayout", {
            content: "viewAllGrades"
        });
    }
});

assignmentSection.route("/grades/student/:id", {
		name: "studentSingle",
		action() {
				BlazeLayout.render("assignmentLayout", {
						content: "studentSingle"
				});
		}
});

profileSection.route('/dashboard', {
	action: function(params, queryParams) {
		BlazeLayout.render("dashboardLayout", { content: 'dashboard' });
	}
});

profileSection.route('/dashboard/new', {
	action: function(params, queryParams) {
		BlazeLayout.render("dashboardLayout", { content: 'newUser' });
	}
})

profileSection.route("/profile/:id", {
  action: function(params, queryParams){
    // BlazeLayout.render("Profile", {
			// body: "aboutme",
			// attendanceBody: "attendanceBody",
			// editAboutMe:"editAboutMe"
		// });
	BlazeLayout.render("profileLayout", { content: "aboutme" });
  }
});

profileSection.route("/profile/edit/:id", {
  action: function(parmas, queryParams){
    BlazeLayout.render("profileLayout", {content: "profileEdit", attendance: "attendance", assignments: "assignments"});
  }
});

attendanceSection.route("/attendance/edit/:id", {
    action: function(params, queryParams){
        // BlazeLayout.render("attendanceUpdate", {updateAttendance: "updateAttendance"});
		BlazeLayout.render("attendanceLayout", {content: "attendanceUpdate"});
    }
});

FlowRouter.route("/assignments/:id", {
    action: function(params, queryParams){
        BlazeLayout.render("Profile", {assignmentsBody: "assignmentsBody"});
    }
});

profileSection.route('/attendance', {
	action: function(params, queryParams) {
		BlazeLayout.render("attendanceLayout", {content: 'profileAttendance'});
	}
})

profileSection.route("/profile", {
    action: function(params, queryParams) {
        BlazeLayout.render("profileLayout", {content:'ProfilesTable'});
		//BlazeLayout.render(main, { content: 'assignmentsBody' });
	}
});

FlowRouter.route("/surveys", {
    action: function(params, queryParams) {
        BlazeLayout.render("surveysLayout", {content:'surveysPage'});
		//BlazeLayout.render(main, { content: 'assignmentsBody' });
	}
});

FlowRouter.route("/surveysResults/:id", {
    action: function(params, queryParams) {
        BlazeLayout.render("surveysLayout", {content:'surveysResults'});
		//BlazeLayout.render(main, { content: 'assignmentsBody' });
	}
});

FlowRouter.route("/individualResults", {
    action: function(params, queryParams) {
        BlazeLayout.render("surveysLayout", {content:'individualResults'});
		//BlazeLayout.render(main, { content: 'assignmentsBody' });
	}
});

FlowRouter.route("/createNewSurvey", {// /:id
    action: function(params, queryParams) {
        BlazeLayout.render("surveysLayout", {content:'newSurvey'});
		//BlazeLayout.render(main, { content: 'assignmentsBody' });
	}
});

FlowRouter.route("/completeSurvey/:id", {// /:id
    action: function(params, queryParams) {
        BlazeLayout.render("surveysLayout", {content:'viewSurveyPage'});
		//BlazeLayout.render(main, { content: 'assignmentsBody' });
	}
});

FlowRouter.route("/addQuestion/:id", {
    action: function(params, queryParams) {
        BlazeLayout.render("surveysLayout", {content:'addQuestion'});
		//BlazeLayout.render(main, { content: 'assignmentsBody' });
	}
});
// //with specific survey id
// FlowRouter.route("/view/:id", {
//     action: function(params, queryParams) {
//         BlazeLayout.render("surveysLayout", {content:'viewSurveyPage'});
// 	}
// });

FlowRouter.route('/home/blogs/:year/:month', {
	name: 'archives',
	action : function(params) {
		BlazeLayout.render(blogLayout, {content: 'archives'});
	}
});

FlowRouter.route('/home/createPost', {
	name: 'createPost',
	action() {
		BlazeLayout.reset();
		BlazeLayout.render(blogLayout, {content: 'createBlogPost'});
	}
});
FlowRouter.route('/reports', {
    action: function(params, queryParams){
        BlazeLayout.render("reportsLayout", {content: 'reports'});
    }
});
FlowRouter.route('/groups', {
	name: 'groups',
	action: function() {
		BlazeLayout.render("groupsLayout", { content: 'groups' });
	}
});
FlowRouter.route('/groups/create', {
	name: 'createGroup',
	action: function() {
		BlazeLayout.render("groupsLayout", {content: 'createGroup'});
	}
});
FlowRouter.route('/groups/edit/:id', {
	name: 'editGroup',
	action: function() {
		BlazeLayout.render("groupsLayout", {content: 'editGroup'});
	}
});


FlowRouter.route('/myGroups', {
	name: 'myGroups',
	action: function() {
		BlazeLayout.render("groupsLayout", {content: 'myGroups'});
	}
});
