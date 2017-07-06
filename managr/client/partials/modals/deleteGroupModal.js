import { Groups } from '../../../collections/groups.js';
import { Student } from '../../../collections/student.js';


Template.deleteGroupModal.helpers({
	groupname: function() {
		/*return Template.instance().data.username;*/
		/*console.log(Template.instance().data._id);*/
		return Template.instance().data.name;
	}
});

Template.deleteGroupModal.events({
	'click .deleteGroup': function(event) {
			event.preventDefault();
			const target = event.target;

			Meteor.call("removeGroup", Template.instance().data._id);
	}
});
