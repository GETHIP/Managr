FlowRouter.route('/', {
	name: 'home',
	action() {
		BlazeLayout.render('mainPage', {currentPage: 'blogMain'});
	}
});

FlowRouter.route('/blogs/:blog_id', {
	name: 'blogs',
	action : function(params) {
		BlazeLayout.render('mainPage', {currentPage: 'postPage'})
	}
});

FlowRouter.route('/testBlogs', {
	name: 'testdata',
	action() {
		BlazeLayout.render('testInsertData', {})
	}
});
var main, assignmentSection;
main = "main";

// Used by all URLs beginning with /assignments
assignmentSection = FlowRouter.group({
    prefix: "/assignments"
});
// TODO remove this when merging with other groups
FlowRouter.route("/", {
    name: "root",
    action() {
        BlazeLayout.render(main,{
            content: "original"
        });
    }
});
// Table of Assignments
assignmentSection.route("/", {
    name: "allAssignments",
    action() {
        BlazeLayout.render(main,{
            content: "listing"
        });
    }
});
assignmentSection.route("/all", {
    name: "allAssignments",
    action() {
        BlazeLayout.render(main,{
            content: "listing"
        });
    }
});
assignmentSection.route("/edit/all", {
    name: "editAllAssignments",
    action() {
        BlazeLayout.render(main,{
            content: "editAll"
        });
    }
});
// Information on a single assignment
assignmentSection.route("/single/:id", {
    name: "singleAssignment",
    action(params) {
        BlazeLayout.render(main,{
            content: "single"
        });
    }
});
assignmentSection.route("/edit/single/:id", {
    name: "editSingleAssignment",
    action(params) {
        BlazeLayout.render(main,{
            content: "editSingle"
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
