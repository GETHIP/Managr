// Must be set to the name of the template in main.html
var default_template = "original";
var assignmentSection = FlowRouter.group({
  prefix: "/assignments"
});
// Delete the next 6 lines when merging with other groups
FlowRouter.route("/", {
  name: "root",
  action() {
    BlazeLayout.render(default_template,{content: "root"});
  }
});
// Assignments Index
assignmentSection.route("/", {
  name: "allAssignments",
  action() {
    BlazeLayout.render(default_template,{content: "all"});
  }
})
// Table of Assignments
assignmentSection.route("/all", {
  name: "allAssignments",
  action() {
    BlazeLayout.render(default_template,{content: "all"});
  }
});
assignmentSection.route("/edit/all", {
  name: "editAllAssignments",
  action() {
    BlazeLayout.render(default_template,{content: "editAll"});
  }
});
// Information on a single assignment
assignmentSection.route("/single/:id", {
  name: "singleAssignment",
  action(params) {
    BlazeLayout.render(default_template,{content: "single"});
  }
});
assignmentSection.route("/edit/single/:id", {
  name: "editSingleAssignment",
  action(params) {
    BlazeLayout.render(default_template,{content: "singleEdit"});
  }
});
// Spreadsheet of grades
assignmentSection.route("/edit/grades", {
  name: "editGrades",
  action() {
    BlazeLayout.render(default_template,{content: "editGrades"});
  }
});
