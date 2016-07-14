
Template.ProfilesTable.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('Student');
  })
})
