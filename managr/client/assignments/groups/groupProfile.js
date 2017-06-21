import { Student } from '../../../collections/student.js';
import { Groups } from '../../../collections/groups.js';

Template.groupName.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('Groups');
  });
});

Template.groupName.helpers({
  groupName: function() {
    let groupId = FlowRouter.getParam("id");
    var groupName = Groups.findOne({"_id": groupId});
    return groupName;
  }
});

Template.studentNames.helpers({
  studentNames: function() {
    let groupId = FlowRouter.getParam("id");
    var theGroup = Groups.findOne({"_id": groupId});
    if (theGroup != null) {
      return theGroup.studentNames;
    }
    else {
      return;
    }
  }
});
