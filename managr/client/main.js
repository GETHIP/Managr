import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Comments } from '../collections/comments.js'
import { Posts } from '../collections/blogPosts.js'
import { Assignments } from "../collections/assignments.js";
import { Student } from "../collections/student.js";
import { nameOfUser } from '../lib/permissions.js';

PostsIndex = new EasySearch.Index({
	collection: Posts,
	fields: ['title', 'text', 'comments', 'authorName'],
	defaultSearchOptions: {
		sortBy: 'date'
	},
	engine: new EasySearch.Minimongo({
	  transform: function(doc){
		var newPosts = {};
		var newDate;
		newDate = moment(doc.date);
		var formattedDate = moment(newDate).format("M/D/YY");
		newPosts = {
			_id: doc._id,
			date: formattedDate,
			title: doc.title,
			text: doc.text,
			authorId: doc.authorId,
			authorName: doc.authorName,
      isPublic: doc.isPublic,
			comments: doc.comments
		};
		return newPosts;
	  },
	  sort: function (searchObject, options) {
		  return {
			date: -1
		  };
	  }
	})
});

studentIndex = new EasySearch.Index({
  name: "studentIndex",
  collection: Student,
  fields: ['name','school','email','grade','getHipYear','parentNames'],
  engine: new EasySearch.Minimongo({
    transform: function (doc){
      doc.url = "/profile/" + doc._id;
      doc.total = 0;
			doc.attendanceNumber = 0;
      for(i=0;i<12;i++){
        doc.total += doc.attendance[i];
      }
      for(i in doc.attendance){
        if(doc.attendance[i] == true){
					doc.attendanceNumber++;
          doc.attendance[i] = "Present";
        }
        if(doc.attendance[i] == false){
          doc.attendance[i] = "Absent";
        }
      }
      doc.parentNames = doc.parentNames.join(" and ");
      return doc;
    }
  }),
  permission: function(){
    return true;
  }
});

Template.main.helpers({
  renderNavbar:function() {
    return (FlowRouter.current().path == "/login") || (Meteor.user() != null);
  },
  navbarDivMargins: function() {
    if ((FlowRouter.current().path == "/login") || (Meteor.user() != null)){
      return "userLoggedIn";
    }
    else{
      return "";
    }
  }
})

Template.blogLayout.helpers({
  renderNavbar:function() {
    return (FlowRouter.current().path == "/login") || (Meteor.user() != null);
  },
  navbarDivMargins: function() {
    if ((FlowRouter.current().path == "/login") || (Meteor.user() != null)){
      return "userLoggedIn";
    }
    else{
      return "";
    }
  }
})

// Gives user window scope over the Assignments collection
window.Assignments = Assignments;