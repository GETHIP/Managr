// Must be set to the name of the template in main.html
var default_template = "original";
// Delete the next 6 lines when merging with other groups
FlowRouter.route("/", {
  name: "root",
  action() {
    BlazeLayout.render(default_template,{content: "root"});
  }
});
// Assignments Index
FlowRouter.route("/assignments", {
  name: "all_assignments",
  action() {
    BlazeLayout.render(default_template,{content: "all"});
  }
})
// Table of Assignments
FlowRouter.route("/assignments/all", {
  name: "all_assignments",
  action() {
    BlazeLayout.render(default_template,{content: "all"});
  }
});
FlowRouter.route("/assignments/edit/all", {
  name: "edit_all_assignments",
  action() {
    BlazeLayout.render(default_template,{content: "edit-all"});
  }
});
// Information on a single assignment
FlowRouter.route("/assignments/single/:id", {
  name: "single_assignment",
  action(params) {
    BlazeLayout.render(default_template,{content: "single"});
  }
});
FlowRouter.route("/assignments/edit/single/:id", {
  name: "edit_single_assignment",
  action(params) {
    BlazeLayout.render(default_template,{content: "single-edit"});
  }
});
// Spreadsheet of grades
FlowRouter.route("/assignments/edit/grades", {
  name: "edit_grades",
  action() {
    BlazeLayout.render(default_template,{content: "edit-grades"});
  }
});
