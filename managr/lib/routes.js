var defaultTemplate = "main";
var assignmentSection = FlowRouter.group({
  prefix: "/assignments"
});
FlowRouter.route("/", {
  name: "root",
  action() {
    BlazeLayout.render(defaultTemplate,{content: "original"});
  }
});
assignmentSection.route("/", {
  name: "allAssignments",
  action() {
    BlazeLayout.render(defaultTemplate,{content: "listing"});
  }
})
// Table of Assignments
assignmentSection.route("/all", {
  name: "allAssignments",
  action() {
    BlazeLayout.render(defaultTemplate,{content: "listing"});
  }
});
assignmentSection.route("/edit/all", {
  name: "editAllAssignments",
  action() {
    BlazeLayout.render(defaultTemplate,{content: "editAll"});
  }
});
// Information on a single assignment
assignmentSection.route("/single/:id", {
  name: "singleAssignment",
  action(params) {
    BlazeLayout.render(defaultTemplate,{content: "single"});
  }
});
assignmentSection.route("/edit/single/:id", {
  name: "editSingleAssignment",
  action(params) {
    BlazeLayout.render(defaultTemplate,{content: "editSingle"});
  }
});
// Spreadsheet of grades
assignmentSection.route("/edit/grades", {
  name: "editGrades",
  action() {
    BlazeLayout.render(defaultTemplate,{content: "editGrades"});
  }
});
