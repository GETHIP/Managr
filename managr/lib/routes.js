FlowRouter.route("/", {
  name: "root",
  action() {
    // TODO Display appropriate template
  }
});
FlowRouter.route("/assignments", {
  name: "all",
  action() {
    // TODO Display the appropriate template
  }
})
/////////////////////////// TABLE OF ALL ASSIGNMENTS
FlowRouter.route("/assignments/all", {
  name: "all",
  action() {
    // TODO Display appropriate template
  }
});
FlowRouter.route("/assignments/edit/all", {
  name: "edit-all",
  action() {
    // TODO Display appropriate template
  }
});
/////////////////////////// SINGLE ASSIGNMENT INFO
FlowRouter.route("/assignments/single/:id", { //TODO Add param
  name: "single", //TODO Add assignment number
  action(params) {
    // TODO Display appropriate template
  }
});
FlowRouter.route("/assignments/edit/single/:id", {
  name: "edit-single",
  action(params) {
    // TODO Display appropriate template
  }
});
/////////////////////////// GRADE SPREADSHEET
FlowRouter.route("/assignments/edit/grades", {
  name: "edit-grades",
  action() {
    //TODO Display appropriate template
  }
});
