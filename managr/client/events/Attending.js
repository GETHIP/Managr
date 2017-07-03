import { Student } from '../../collections/student.js';
import { Instructor } from '../../collections/instructor.js';
import { Events } from '../../collections/event.js';
import { Groups } from '../../collections/groups.js';

Template.attending.onCreated(function() {
    Meteor.subscribe("Student");
    Meteor.subscribe("Events");
    Meteor.subscribe("Instructor");
    Meteor.subscribe("Groups");
});

Template.attending.events({
  'click .goToProfile': function(event) {
    event.preventDefault();
    const target = event.target;
    FlowRouter.go('/profile/' + target.id);
  },
  });

Template.attending.helpers({
  'event': function(){
  data = Events.findOne({_id: FlowRouter.getParam("id")});
  rList = data.rsvp;
  var countAttending = 0;
  var countNotAttending = 0;
  for(var i = 0; i < rList.length; i++){
    name = Student.findOne({_id: rList[i]._id}).name;
    rList[i].name = name;
    if(rList[i].rsvp == true){
      rList[i].status = "Attending";
      countAttending++;
    }else{
      rList[i].status = "Not Attending";
      countNotAttending++;
    }
  }
  console.log(countAttending);
  console.log(countNotAttending);
  rList.countAttending = countAttending;
  rList.countNotAttending = countNotAttending;
  return rList;
}

});
