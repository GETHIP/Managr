if(Meteor.isClient) {
	Accounts.onLogout(function() {
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
blogsSection.route('/', {
	name: 'home',
	action() {
		BlazeLayout.render(blogLayout, {content: 'blogMain'});
	}
});
blogsSection.route('/login', {
	name: 'login',
	action() {
		BlazeLayout.render(blogLayout, {content: 'blogMain'});
	}
});

blogsSection.route('/blogs/:blog_id', {
	name: 'blogs',
	action : function(params) {
		BlazeLayout.render(blogLayout, {content: 'postPage'})
	}
});
blogsSection.route('/testBlogs', {
	name: 'testBlogs',
	action: function() {
		BlazeLayout.render('testInsertData');
	}
})

assignmentSection.route("/", {
    name: "allAssignments",
    action() {
        BlazeLayout.render(main, {content: "studentsAllAssignments"});
    }
});
assignmentSection.route("/all", {
    name: "allAssignments",
    action() {
        BlazeLayout.render(main,{
            content: "studentsAllAssignments"
        });
    }
});
// Information on a single assignment
assignmentSection.route("/single/:id", {
    name: "singleAssignment",
    action(params) {
        BlazeLayout.render(main,{
            content: "singleAssignment"
        });
    }
});
//this is a temp route
assignmentSection.route("/single/admin/:id", {
    name: "adminSingleAssignment",
    action(params) {
        BlazeLayout.render(main,{
            content: "adminSingleAssignment"
        });
    }
});

assignmentSection.route("/edit/single/:id", {
    name: "editSingleAssignment",
    action(params) {
        BlazeLayout.render(main,{
            content: "editSingleAssignment"
        });
    }
});
assignmentSection.route('/edit/new', {
    name: "newAssignment",
    action(params) {
        BlazeLayout.render(main, {
            content: "newAssignment"
        });
    }
});

assignmentSection.route('/grades', {
    name: "viewAllGrades",
    action() {
        BlazeLayout.render(main, {
            content: "viewAllGrades"
        });
    }
});

assignmentSection.route('/viewAll', {
    name: "viewAllAssignments",
    action() {
        BlazeLayout.render(main, {
            content: "viewAllAssignTable"
        });
    }
});

// Spreadsheet of grades
assignmentSection.route("/edit/grades", {
    name: "editGrades",
    action() {
        BlazeLayout.render(main,{
            content: "editGrades"
        });
    }
});
profileSection.route("/profile/:id", {
  action: function(params, queryParams){
    BlazeLayout.render("Profile", {
			body: "aboutme",
			attendanceBody: "attendanceBody",
			assignmentsBody: "assignmentsBody",
			editAboutMe:"editAboutMe"
		});
  }
});

profileSection.route("/profile/edit/:id", {
  action: function(parmas, queryParams){
    BlazeLayout.render("Profile", {body: "profileEdit", attendance: "attendance", assignments: "assignments"});
  }
});

attendanceSection.route("/attendance/edit/:id", {
    action: function(params, queryParams){
        BlazeLayout.render("attendanceUpdate", {updateAttendance: "updateAttendance"});
    }
});

FlowRouter.route("/assignments/:id", {
    action: function(params, queryParams){
        BlazeLayout.render("Profile", {assignmentsBody: "assignmentsBody"});
    }
});

profileSection.route("/profiles", {
    action: function(params, queryParams) {
        BlazeLayout.render(main, {content:'ProfilesTable'});
		//BlazeLayout.render(main, { content: 'assignmentsBody' });
	}
});

FlowRouter.route("/reports", {
    action: function(params, queryParams){
        BlazeLayout.render("Profile", {body: "reports"});
    }
});

FlowRouter.route('/blogs/:year/:month', {
	name: 'archives',
	action : function(params) {
		BlazeLayout.render(blogLayout, {content: 'archives'});
	}
});

FlowRouter.route('/createPost', {
	name: 'createPost',
	action() {
		BlazeLayout.render(blogLayout, {content: 'createPost'});
}
});
