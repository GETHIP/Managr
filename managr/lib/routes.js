var main, assignmentSection;
main = "main";
FlowRouter.route('/', {
	name: 'home',
	action() {
		BlazeLayout.render(main, {content: 'blogMain'});
	}
});
FlowRouter.route('/blogs/:blog_id', {
	name: 'blogs',
	action : function(params) {
		BlazeLayout.render(main, {content: 'postPage'})
	}
});

// Used by all URLs beginning with /assignments
assignmentSection = FlowRouter.group({
    prefix: "/assignments"
});
// Table of Assignments
assignmentSection.route("/", {
    name: "allAssignments",
    action() {
        BlazeLayout.render(main,{
            content: "allStudent"
        });
    }
});
assignmentSection.route("/all", {
    name: "allAssignments",
    action() {
        BlazeLayout.render(main,{
            content: "allStudent"
        });
    }
});
// Information on a single assignment
assignmentSection.route("/single/:id", {
    name: "singleAssignment",
    action(params) {
        BlazeLayout.render(main,{
            content: "studentSingle"
        });
    }
});
assignmentSection.route("/edit/single/:id", {
    name: "editSingleAssignment",
    action(params) {
        BlazeLayout.render(main,{
            content: "editAssignment"
        });
    }
});
// Create a new assignment
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
FlowRouter.route("/profile/:id", {
  action: function(params, queryParams){
    BlazeLayout.render("Profile", {body: "aboutme", attendanceBody: "attendanceBody", assignmentsBody: "assignmentsBody", editAboutMe:"editAboutMe"});
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

FlowRouter.route("/assignments/:id", {
    action: function(params, queryParams){
        BlazeLayout.render("Profile", {assignmentsBody: "assignmentsBody"});
    }
});

FlowRouter.route("/profiles", {
    action: function(params, queryParams) {
        BlazeLayout.render('ProfilesTable');
    }
})
