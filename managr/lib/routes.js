var main = "main"

// Used by all URLs beginning with /assignments
var assignmentSection = FlowRouter.group({
    prefix: "/assignments"
});
FlowRouter.route('/', {
	name: 'home',
	action() {
		BlazeLayout.render(main, {content: 'blogMain'});
	}
});
FlowRouter.route('/login', {
	name: 'home',
	action() {
		BlazeLayout.render(main, {navigationBar: 'topNav', content: 'blogMain'});
	}
});

FlowRouter.route('/blogs/:blog_id', {
	name: 'blogs',
	action : function(params) {
		BlazeLayout.render(main, {content: 'postPage'})
	}
});

assignmentSection.route("/", {
    name: "allAssignments",
    action() {
        BlazeLayout.render(main,{
            content: "studentsAllAssignments"
        });
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
FlowRouter.route("/profile/:id", {
  action: function(params, queryParams){
    BlazeLayout.render("Profile", {
			body: "aboutme",
			attendanceBody: "attendanceBody",
			assignmentsBody: "assignmentsBody",
			editAboutMe:"editAboutMe"
		});
  }
});

FlowRouter.route("/profile/edit/:id", {
  action: function(parmas, queryParams){
    BlazeLayout.render("Profile", {body: "profileEdit", attendance: "attendance", assignments: "assignments"});
  }
});

FlowRouter.route("/attendance/edit/:id", {
    action: function(params, queryParams){
        BlazeLayout.render("attendanceUpdate", {updateAttendance: "updateAttendance"});
    }
});

FlowRouter.route("/profiles", {
    action: function(params, queryParams) {
				BlazeLayout.render(main, {content: 'ProfilesTable'});
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
		BlazeLayout.render(main, {content: 'blogMain'});
	}
});

FlowRouter.route('/createPost', {
	name: 'createPost',
	action() {
		BlazeLayout.render(main, {content: 'createPost'});
}
});
