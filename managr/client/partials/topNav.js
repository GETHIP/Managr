import { Template } from 'meteor/templating';

Template.topNav.helpers({
	// activeClass(group) {
	// 	if (FlowRouter.current().route.group.name == group) {
	// 		// return "active " + group + "Active";
	// 		return group + "Active";
	// 	} else {
	// 		return "";
	// 	}
	// }
	activeIfTemplateIs: function (urlPath) {
     var currentRoute = FlowRouter.current().path;
		 console.log(currentRoute);
     return currentRoute && currentRoute.includes(urlPath) ? 'activated' : ''; 
   }

});

Template.topNav.events({

	// "click .active"(event) {
	// 		var url = window.location.href;
	// 		url = url.substring(7,url.length).split("/");
	//
	// 		var idTags = ["blogsTab", "assignmentTab", "attendanceTab", "profilesTab", "reportsTab","dashboardTab"];
	//
	// 		for(i = 0; i < 6; i++) {
	// 			element = document.getElementById(idTags[i]);
	// 			element.classList.remove('activated');
	// 		}
	//
	// 		switch(url[1]) {
	// 			case "":
	// 				element = document.getElementById("blogsTab");
	// 				element.classList.add('activated');
	// 				return;
	// 			case "assignments":
	// 				element = document.getElementById("assignmentTab");
	// 				element.classList.add('activated');
	// 				return;
	// 			case "profiles":
	// 				if(url[2] == "attendance") {
	// 					element = document.getElementById("attendanceTab");
	// 				} else {
	// 					element = document.getElementById("profilesTab");
	// 				}
	// 				element.classList.add('activated');
	// 				return;
	// 			case "reports":
	// 				element = document.getElementById("reportsTab");
	// 				element.classList.add('activated');
	// 				return;
	// 			case "dashboard":
	// 				element = document.getElementById("dashboardTab");
	// 				element.classList.add('activated');
	// 				return;
	// 			default:
	// 				return;
	// 		}
	// }
	// clear() {
	// 	var idTags = ["blogsTab", "assignmentTab", "attendanceTab", "profilesTab", "reportsTab","dashboardTab"];
	//
	// 	for(i = 0; i < 6; i++) {
	// 		element = document.getElementById(idTags[i]);
	// 		element.classList.remove('activated');
	// 	}
	// },
	// "click #blogsTab"(event) {
	// 	 element = document.getElementById("blogsTab");
	// 	 element.classList.add('activated');
	// },
	// "click #assignmentTab"(event) {
	// 	 element = document.getElementById("assignmentTab");
	// 	 element.classList.add('activated');
	// },
	// "click #attendanceTab"(event) {
	// 	 element = document.getElementById("attendanceTab");
	// 	 element.classList.add('activated');
	// },
	// "click #profilesTab"(event) {
	// 	 element = document.getElementById("profilesTab");
	// 	 element.classList.add('activated');
	// },
	// "click #reportsTab"(event) {
	// 	 element = document.getElementById("reportsTab");
	// 	 element.classList.add('activated');
	// },
	// "click #dashboardTab"(event) {
	// 	 element = document.getElementById("dashboardTab");
	// 	 element.classList.add('activated');
	// }

});
