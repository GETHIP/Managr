import { Groups } from '../../../collections/groups.js';
import { Student } from '../../../collections/student.js';

//
// Template.createGroupModal.helpers({
// 		groupname: function() {
//     /*return Template.instance().data.username;*/
//     /*console.log(Template.instance().data._id);*/
// 		    return Template.instance().data.name;
//     }
// });

Template.createGroupModal.onCreated(function() {
    Meteor.subscribe("Groups");
});

Template.createGroupModal.events({
    'submit #nameGroupForm': function(event) {
		    event.preventDefault();
		    const target = event.target;
				var groupName = target.groupName.value;
				var dateCreated = new Date().getTime();

				if (groupName != null) {
						Modal.hide("createGroupModal");
						Meteor.call("createGroup", groupName, dateCreated, function(error, result) {
							FlowRouter.go("/groups/edit/" + result);
						});
				}
  	}
});
