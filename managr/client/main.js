import { Template } from 'meteor/templating';
Template.body.helpers({
  page: function() {
    return FlowRouter.current().route.name;
  }
});
