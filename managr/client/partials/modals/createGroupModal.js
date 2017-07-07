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

        var allGroups = Groups.find({}).fetch();
        var numGroups = allGroups.length;

        var ifNameInName = 0;

          if ((groupName != null) && (Groups.findOne({ name: groupName }) == null)) {
            console.log("asdakjdfajkdfnjdflnf");
            ifNameInName = 2;
          } else {
            console.log("iuasdhfsb");
          }

          if (ifNameInName == 2) {
            Modal.hide("createGroupModal");
            Meteor.call("createGroup", groupName, dateCreated, function(error, result) {
              FlowRouter.go("/groups/edit/" + result);
            });
          }

  	}
});
