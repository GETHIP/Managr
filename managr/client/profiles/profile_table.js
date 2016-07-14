import { Student } from '../../collections/student.js';

Template.ProfilesTable.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('Student');
  })
})

Template.ProfilesTable.helpers({
  ProfilesTable: function() {
    let Profiles = Student.find({});
    let ProfilesTable = [];
    Profiles.forEach(function(currentValue, index, profile){
      currentValue.url = "/profile/" + currentValue._id;
      for(i in currentValue.attendance){
        if(currentValue.attendance[i] === true){
          currentValue.attendance[i] = "Present";
        }
        if(currentValue.attendance[i] === false){
          currentValue.attendance[i] = "Absent";
        }
      }
      currentValue.parentNames = currentValue.parentNames.join(" and ");
      ProfilesTable.push(currentValue);
    });
    return ProfilesTable;
  },
  studentIndex: function(){
    return studentIndex;
  }
});
