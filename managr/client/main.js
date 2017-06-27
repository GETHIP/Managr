import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Comments } from '../collections/comments.js'
import { Posts } from '../collections/blogPosts.js'
import { Assignments } from "../collections/assignments.js";
import { Student } from "../collections/student.js";
import { nameOfUser } from '../lib/permissions.js';
import { Surveys } from '../collections/surveys.js';

PostsIndex = new EasySearch.Index({
	collection: Posts,
	fields: ['title', 'text', 'comments', 'authorName'],
	defaultSearchOptions: {
		sortBy: 'date',
		limit: 1000
	},
	engine: new EasySearch.Minimongo({
	  transform: function(doc){
		var newPosts = {};
		var newDate;
		newDate = moment(doc.date);
		var formattedDate = moment(newDate).format("M/D/YY");
		var formattedUpdate = moment(doc.lastUpdated).format("M/D/YY");
		newPosts = {
			_id: doc._id,
			date: formattedDate,
			lastUpdated: formattedUpdate,
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
			lastUpdated: -1
		  };
	  }
	})
});

studentIndex = new EasySearch.Index({
  name: "studentIndex",
  collection: Student,
  fields: ['name','school','email','grade','getHipYear','parentNames'],
	defaultLimit: 100,
	limit: 100,
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
  },
  defaultSearchOptions: {
    limit: 1000
  }
});

groupIndex = new EasySearch.Index({
	collection: Groups,
	fields: ['name', 'leader', 'stringSize', 'studentNames'],
	defaultSearchOptions: {
		sortBy: 'datecreated',
		limit: 1000
	},
	engine: new EasySearch.Minimongo({
		transform: function(doc){
				var group = {};
				group = {
						name: doc.name,
						size: doc.size,
						students: formatStudentsForGroup(doc),
						leader: doc.leader,
						groupId: doc._id
				};
				return group;
		},
		sort: function (searchObject, options) {
				const sortBy = options.search.props.sortBy

				// return a mongo sort specifier
				if ('default' === sortBy) {
					return;
				}
				else if ('datecreated' === sortBy) {
					return {
						dateCreated: -1,
					};
				}
				else if ('name' === sortBy) {
					return {
						name: 1,
					};
				}
				else if ('sizeinc' === sortBy) {
					return {
						size: 1,
					};
				}
				else if ('sizedec' === sortBy) {
					return {
						size: -1,
					};
				}
				/*
				else {
					throw new Meteor.Error('Invalid sort by prop passed')
				}
				*/
		}

		/*
		selector: function (searchObject, options, aggregation) {
				const selector = this.defaultConfiguration().selector(searchObject, options, aggregation)

				// filter for the grouptype if set
				if (options.search.props.grouptype) {
					selector.grouptype = options.search.props.grouptype
				}
				return selector
		}
		*/
	})
});

var formatStudentsForGroup = function(group) {
    var studentIds = group.studentIds;
    var formattedStudents = [];

    for(var i = 0; i < studentIds.length; i++) {
        var student = Student.findOne({_id: studentIds[i]});
        if(student == undefined) {
            continue;
        }
        var formattedStudent = {
            name: student.name
        }
        formattedStudents.push(formattedStudent);
    }
    return formattedStudents;
}

Template.main.helpers({
  renderNavbar:function() {
    return (FlowRouter.current().path == "/login") || (Meteor.user() != null);
  },
  navbarDivMargins: function() {
      return "userLoggedIn";
  },
})

Template.topNav.helpers({
	renderNavbar:function() {
    return (FlowRouter.current().path == "/login") || (Meteor.user() != null);
  }
})

Template.blogLayout.helpers({
  renderNavbar:function() {
    return (FlowRouter.current().path == "/login") || (Meteor.user() != null);
  },
  navbarDivMargins: function() {
      return "userLoggedIn";
  }
})

// Gives user window scope over the Assignments collection
window.Assignments = Assignments;
