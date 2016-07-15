Template.commentDisplay.helpers({
  isCurrentUser: function(id){
    return (id == Meteor.user()._id);
  }
});
