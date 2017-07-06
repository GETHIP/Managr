import { Surveys } from '../../collections/surveys.js';
import { Student } from '../../collections/student.js';

Template.surveyLink.onCreated(function() {
  Meteor.subscribe("Surveys", function() {
    var survey = Surveys.findOne({_id: FlowRouter.getParam("id")});
    // if(survey == undefined) {
    //     FlowRouter.go("/surveys");
    // }
  });
  Meteor.subscribe("Student");
});


Template.surveyLink.helpers({
  getDomain: function() {
    return window.location.hostname+(location.port ? ':'+location.port: '');
  },
  getUrl: function() {
    var current = window.location.href;
    var currentArray = current.split('/');
    return currentArray[currentArray.length-1];
  },
  surveyPath: function() {
    var post = this;
    var params = {
      category: post.category,
      postId: post._id
    };
    var queryParams = {comments: "yes"};
    var routeName = "completeSurvey";
    var path = FlowRouter.path(routeName, params, queryParams);

    return path;
  }
});

Template.surveyLink.events({

  'click #copyLinkButton' (event) {
    var copyTextarea = document.querySelector('.linkArea');
    copyTextarea.select();
    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      console.log('Copying!');
      document.getElementById("copyLinkNote").classList.remove('hideNote');
    } catch (err) {
      console.log('Error: unable to copy');
    } finally {
      clearSelection();
    }
  },
  'click #copyLinkNote' (event) {
    document.getElementById("copyLinkNote").classList.add('hideNote');
  },
  'click #finished' (event) {
    FlowRouter.go("/surveys");
  }

});

function clearSelection() {
  var sel;
  if ( (sel = document.selection) && sel.empty ) {
    sel.empty();
  } else {
    if (window.getSelection) {
      window.getSelection().removeAllRanges();
    }
    var activeEl = document.activeElement;
    if (activeEl) {
      var tagName = activeEl.nodeName.toLowerCase();
      if ( tagName == "textarea" ||
      (tagName == "input" && activeEl.type == "text") ) {
        // Collapse the selection to the end
        activeEl.selectionStart = activeEl.selectionEnd;
      }
    }
  }
}
