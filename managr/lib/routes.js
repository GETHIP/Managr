FlowRouter.route('/attendance', {
  name: 'attendance.show',
  action: function(params, queryParams) {
    console.log("Looking at a list?");
  }
//  BlazeLayout.render("main", {content: "Login"});
});

FlowRouter.route("/profile/:id", {
  action: function(params, queryParams){
    BlazeLayout.render("Profile", {content: "aboutme"});
  }
});
