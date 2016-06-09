import { Template } from 'meteor/templating';
Template.body.helpers({
  page: function() {
    var current_page = current_page = FlowRouter.getRouteName();
    if (current_page == null || current_page.length < 1) {
      return "404 Error. Page not found.";
    }
    else {
      return current_page;
    }
  }
});
Template.body.helpers({
  param: function() {
    var parameters;
    id = FlowRouter.getParam("id");
    if (typeof id == undefined) {
      return "none";
    }
    else {
      return id;
    }
  }
})
