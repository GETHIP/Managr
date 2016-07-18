export function isStudent() {
  if(Meteor.user() == null) {
    return false;
  }
  return Roles.userIsInRole(Meteor.user()._id, "student");
}

export function isInstructor() {
  if(Meteor.user() == null) {
    return false;
  }
  return Roles.userIsInRole(Meteor.user()._id, "instructor");
}

export function userIsValid() {
  if (Meteor.user() == null) {
    return false;
  }
  return !Roles.userIsInRole(Meteor.user()._id, "unconfirmed");
}

export function currentUserOrInstructor(id) {
  if (Meteor.user() == null) {
    return false;
  }
  return id == Meteor.user()._id || Roles.userIsInRole(Meteor.user()._id, "instructor");
}