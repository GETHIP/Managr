import { Student } from '../../../collections/student.js';
import { Instructor } from '../../../collections/instructor.js';

 Template.deleteUserModal.onCreated(function(){
   Meteor.subscribe('Student');
 });

Template.deleteUserModal.helpers({
	username: function() {
		return Template.instance().data.username;
	}
});

Template.deleteUserModal.events({
	'click #confirmDeleteUser':function(event) {
	   var thisStudent =	Student.findOne({userId: Template.instance().data._id});
     if(thisStudent == null) {
       var id = Instructor.findOne({userId: Template.instance().data._id})._id;
     }else{
      var id = thisStudent._id;
      Meteor.call("removeUEvals", id);
     }
	   Meteor.call('deleteUser', Template.instance().data._id);
	}
});
