import { Student } from '../../collections/student.js';
import { Instructor } from '../../collections/instructor.js';
import { Events } from '../../collections/event.js';
import { Groups } from '../../collections/groups.js';

Template.attending.onCreated(function() {
    Meteor.subscribe("Student");
    Meteor.subscribe("Events");
    Meteor.subscribe("Instructor");
    Meteor.subscribe("Groups");

    Template.instance().sortDescriptor = new ReactiveVar("studentNameSort");
    Template.instance().sortAscending = new ReactiveVar(true);
});


  Template.attending.helpers({
      students: function() {
          var studentData = [];
          Student.find({}).forEach(function(student) {
            studentData.push({
              studentId: student._id
            });
          });
        }
    });

Template.attending.helpers({
  'event': function(){
    data = Events.findOne({_id: FlowRouter.getParam("id")});
    rList = data.rsvp;
    var countAttending = 0;
    var countNotAttending = 0;
    for(var i = 0; i < rList.length; i++){
      var student = Student.findOne({_id: rList[i]._id});
      name = student.name;
      rList[i].name = name;
      if(rList[i].rsvp == true){
        rList[i].status = "Attending";
        countAttending++;
      }else{
        rList[i].status = "Not Attending";
        countNotAttending++;
      }
    }
    rList.countAttending = countAttending;
    rList.countNotAttending = countNotAttending;

    var sortDescriptor = Template.instance().sortDescriptor.get();
    var sortDirection = Template.instance().sortAscending.get() ? 1 : -1;
    rList.sort(function(student1, student2) {
        if (sortDescriptor == "studentNameSort") {
            return (student1.name.localeCompare(student2.name)) * sortDirection;
        } else if(sortDescriptor == "studentRSVPSort") {
              return (student1.status.localeCompare(student2.status)) * sortDirection;
        }
    });
    return rList;
}

});
Template.attending.events({
    'click .sortIcon': function(event) {
        var sortDescriptor = Template.instance().sortDescriptor.get();

        if(event.target.id == sortDescriptor) {
          Template.instance().sortAscending.set(!Template.instance().sortAscending.get());
        } else {
          Template.instance().sortDescriptor.set(event.target.id);
          Template.instance().sortAscending.set(true);
        }
    }
  });
