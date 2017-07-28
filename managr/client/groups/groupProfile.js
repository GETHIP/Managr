import { Student } from '../../collections/student.js';
import { Groups } from '../../collections/groups.js';

Template.groupProfile.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('Groups');
  });
});

Template.groupProfile.helpers({
  groupName: function() {
    let groupId = FlowRouter.getParam("id");
    var groupName = Groups.findOne({"_id": groupId});
    return groupName.name;
  },
  studentNames: function() {
    let groupId = FlowRouter.getParam("id");
    var theGroup = Groups.findOne({"_id": groupId});
    if (theGroup != null) {
      return theGroup.studentNames;
    }
    else {
      return;
    }
  },
  groupTypeHelper: function() {
    let groupId = FlowRouter.getParam("id");
    var theGroup = Groups.findOne({"_id": groupId});
    var groupType = theGroup.groupType;
    return groupType;
  },
  groupCoach: function() {
    let groupId = FlowRouter.getParam("id");
    var theGroup = Groups.findOne({"_id": groupId});
    if (!theGroup.coachNames || theGroup.coachNames.length == 0){
      return "None";
   } else {
      return theGroup.coachNames;
   }
 },
  groupSize: function() {
    let groupId = FlowRouter.getParam("id");
    var groupSize = Groups.findOne({"_id": groupId});
    return groupSize;
   }
});

Template.groupProfile.events({
	"click .editGroupBtn" (event) {
		FlowRouter.go("/groups/edit/" + FlowRouter.getParam("id"));
	},
	"click .groupBack" (event) {
		FlowRouter.go("/groups/");
	}
});
