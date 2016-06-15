FlowRouter.route('/attendance', {
  name: 'attendance.show',
  action: function(params, queryParams) {
    console.log("Looking at a list?");
  }
//  BlazeLayout.render("main", {content: "Login"});
});

FlowRouter.route("/profile/:id", {
  action: function(params, queryParams){
    BlazeLayout.render("Profile", {body: "aboutme", attendance: "attendance", editAboutMe: "editAboutMe", assignments:"assignments"});
  }
});

FlowRouter.route("/profile/edit/:id", {
  action: function(parmas, queryParams){
    BlazeLayout.render("Profile", {body: "profileEdit", attendance: "attendance"});
  }
});
