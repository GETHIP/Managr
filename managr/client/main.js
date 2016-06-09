import { Template } from 'meteor/templating';
Template.body.helpers({
  page: function() {
    var currentPage = currentPage = FlowRouter.getRouteName();
    if (current_page == null || current_page.length < 1) {
      return "404 Error. Page not found.";
    }
    else {
      return currentPage;
    }
  }
});
Template.body.helpers({
  param: function() {
    var parameters, id;
    id = FlowRouter.getParam("id");
    if (typeof id == undefined) {
      return "none";
    }
    else {
      return id;
    }
  }
})
