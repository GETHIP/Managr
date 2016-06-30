var main = "mainPage"

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
		BlazeLayout.render(main, {content: 'blogMain'});
	}
});
blogsSection.route('/login', {
	name: 'login',
	action() {
		BlazeLayout.render(main, {content: 'blogMain'});
	}
});

blogsSection.route('/blogs/:blog_id', {
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
        // BlazeLayout.render('ProfilesTable');
        BlazeLayout.render(main, {content:'ProfilesTable'});
    }
})
