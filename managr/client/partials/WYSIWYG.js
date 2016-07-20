Template.WYSIWYG.onRendered = function(){
  $("editor").wysiwyg({
    hotKeys: {
      'ctrl+b meta+b': 'bold',
      'ctrl+i meta+i': 'italic',
      'ctrl+u meta+u': 'underline',
      'ctrl+z meta+z': 'undo',
      'ctrl+y meta+y meta+shift+z': 'redo'
    }
  });
}
Template.WYSIWYG.helpers({
  isAssignmentsRoute: function() {
    return FlowRouter.current().route.name == "editSingleAssignment";
  },
  assignments: function() {
    if (!(FlowRouter.current().path.includes("new"))) {
      var assignment = Assignments.findOne({_id: FlowRouter.getParam("id")});

	    var formattedAssignment;
      formattedAssignment = {
        description: assignment.description
      }
      return formattedAssignment;
    }
  }
});
