FlowRouter.route("/", {
  name: "root",
  action() {
    BlazeLayout.render("original",{content: "root"});
  }
});
FlowRouter.route("/assignments", {
  name: "all",
  action() {
    BlazeLayout.render("original",{content: "all"});
  }
})
/////////////////////////// TABLE OF ALL ASSIGNMENTS
FlowRouter.route("/assignments/all", {
  name: "all",
  action() {
    BlazeLayout.render("original",{content: "all"});
  }
});
FlowRouter.route("/assignments/edit/all", {
  name: "edit-all",
  action() {
    BlazeLayout.render("original",{content: "edit-all"});
  }
});
/////////////////////////// SINGLE ASSIGNMENT INFO
FlowRouter.route("/assignments/single/:id", { //TODO Add param
  name: "single", //TODO Add assignment number
  action(params) {
    BlazeLayout.render("original",{content: "single"});
  }
});
FlowRouter.route("/assignments/edit/single/:id", {
  name: "edit-single",
  action(params) {
    BlazeLayout.render("original",{content: "single-edit"});
  }
});
/////////////////////////// GRADE SPREADSHEET
FlowRouter.route("/assignments/edit/grades", {
  name: "edit-grades",
  action() {
    BlazeLayout.render("original",{content: "edit-grades"});
  }
});
