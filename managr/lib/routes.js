// Must be set to the name of the template in main.html
var default_template = "original";
var assignment_section = FlowRouter.group({
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
assignment_section.route("/", {
  name: "all_assignments",
  action() {
    BlazeLayout.render(default_template,{content: "all"});
  }
})
// Table of Assignments
assignment_section.route("/all", {
  name: "all_assignments",
  action() {
    BlazeLayout.render(default_template,{content: "all"});
  }
});
assignment_section.route("/edit/all", {
  name: "edit_all_assignments",
  action() {
    BlazeLayout.render(default_template,{content: "edit-all"});
  }
});
// Information on a single assignment
assignment_section.route("/single/:id", {
  name: "single_assignment",
  action(params) {
    BlazeLayout.render(default_template,{content: "single"});
  }
});
assignment_section.route("/edit/single/:id", {
  name: "edit_single_assignment",
  action(params) {
    BlazeLayout.render(default_template,{content: "single-edit"});
  }
});
// Spreadsheet of grades
assignment_section.route("/edit/grades", {
  name: "edit_grades",
  action() {
    BlazeLayout.render(default_template,{content: "edit-grades"});
  }
});
