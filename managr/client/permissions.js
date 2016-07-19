import { isStudent, isInstructor, userIsValid, currentUserOrInstructor } from '../lib/permissions.js';

UI.registerHelper("isStudent", function() {
  return isStudent();
});
UI.registerHelper("isInstructor", function() {
  return isInstructor();
});
UI.registerHelper("userIsValid", function() {
  return userIsValid();
});
UI.registerHelper("currentUserOrInstructor", function(id) {
  return currentUserOrInstructor(id);
});