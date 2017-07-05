import { Student } from '../../collections/student.js';
 import { Eval } from '../../collections/eval.js';
 import { Milestone } from '../../collections/milestone.js';
 import { Instructor } from '../../collections/instructor.js';

 var _dep = new Deps.Dependency();

 Template.viewEval.onCreated(function(){
   Meteor.subscribe('Eval');
   Meteor.subscribe('Student');
   Meteor.subscribe('Instructor');
   Meteor.subscribe('Milestone');

   Template.instance().sortDescriptor = new ReactiveVar("NameSort");
   Template.instance().sortAscending = new ReactiveVar(true);

   _dep.changed();
 });

 Template.viewEval.helpers({

   data: function(){
     _dep.depend()
 console.log(document.getElementById("studentChoice"));
     console.log("hi");
     var selectStudent = document.getElementById("studentChoice");
     var selectInstruct = document.getElementById("instructorChoice");
     var selectMile = document.getElementById("milestoneChoice");

    //  document.getElementsByClassName("resetbtn").addEventListener("click", function displayTable() {
    //      var data = Eval.find().fetch();
    //      for(var i = 0; i < data.length; i++){
    //      //  console.log(Student.findOne({_id: data[i].evaluatee}));
    //      data[i].name = Student.findOne({_id: data[i].evaluatee}).name;
    //      data[i].instructor = Instructor.findOne({_id: data[i].evaluator}).name;
    //      data[i].week = Milestone.findOne({_id: data[i].week}).name;
    //      //console.log(data[i].week);
    //     console.log(data[i].name);
    //     console.log(data[i].instructor);
    //     console.log(data[i].stars);
    //      data[i].effort = data[i].stars[0];
    //      data[i].att = data[i].stars[1];
    //      data[i].team = data[i].stars[2];
    //      data[i].tech = data[i].stars[3];
    //    }
    //    return data;
    //  });
     if (selectStudent == null || selectInstruct == null || selectMile == null)
     {
       console.log("it works?");
       selectStudent = "sortAll";
       selectInstruct = "sortAll";
       selectMile = "sortAll";
     }
     else{
     selectStudent = selectStudent.value;
     selectInstruct = selectInstruct.value;
     selectMile = selectMile.value;
     }
     console.log(selectMile);
     if(selectStudent == "sortAll" && selectInstruct == "sortAll" && selectMile == "sortAll"){
         //console.log(Eval.find({}).fetch());
         var data = Eval.find().fetch();
         for(var i = 0; i < data.length; i++){
         //  console.log(Student.findOne({_id: data[i].evaluatee}));
         data[i].name = Student.findOne({_id: data[i].evaluatee}).name;
         data[i].instructor = Instructor.findOne({_id: data[i].evaluator}).name;
         data[i].week = Milestone.findOne({_id: data[i].week}).name;
         //console.log(data[i].week);
        // console.log(data[i].name);
        // console.log(data[i].instructor);
        // console.log(data[i].stars);
         data[i].effort = data[i].stars[0];
         data[i].att = data[i].stars[1];
         data[i].team = data[i].stars[2];
         data[i].tech = data[i].stars[3];
       }
     }

     if(selectStudent != "sortAll" && selectInstruct == "sortAll" && selectMile == "sortAll"){
       var data = [];
       var dataList = Eval.find({evaluatee: document.getElementById("studentChoice").value}).fetch();
       console.log(dataList)
       dataList.forEach(function(element){
         element.name = $("#studentChoice option:selected").text();
         element.instructor = Instructor.findOne({_id: element.evaluator}).name;
         element.week = Milestone.findOne({_id: element.week}).name;
         console.log(element.week);
         element.effort = element.stars[0];
         element.att = element.stars[1];
         element.team = element.stars[2];
         element.tech = element.stars[3];
         data.push(element);
       });
     }
       if(selectStudent == "sortAll" && selectInstruct != "sortAll" && selectMile == "sortAll"){
         var data = [];
         var dataList = Eval.find({evaluator: document.getElementById("instructorChoice").value}).fetch();
         console.log(dataList)
         dataList.forEach(function(element){
           element.name = Student.findOne({_id: element.evaluatee}).name;
           console.log(element.name)
           element.instructor = $("#instructorChoice option:selected").text();
           element.week = Milestone.findOne({_id: element.week}).name;
           element.effort = element.stars[0];
           element.att = element.stars[1];
           element.team = element.stars[2];
           element.tech = element.stars[3];
           data.push(element);
         });
       }
         if(selectStudent != "sortAll" && selectInstruct != "sortAll" && selectMile == "sortAll"){
           var data = [];
           var dataList = Eval.find({
             evaluator: document.getElementById("instructorChoice").value,
             evaluatee: document.getElementById("studentChoice").value
           }).fetch();
           console.log(dataList)
           dataList.forEach(function(element){
             element.name = Student.findOne({_id: element.evaluatee}).name;
             element.instructor = Instructor.findOne({_id: element.evaluator}).name;;
             element.week = Milestone.findOne({_id: element.week}).name;
             element.effort = element.stars[0];
             element.att = element.stars[1];
             element.team = element.stars[2];
             element.tech = element.stars[3];
             data.push(element);
           });
         }
         if(selectStudent == "sortAll" && selectInstruct == "sortAll" && selectMile != "sortAll"){
             //console.log(Eval.find({}).fetch());
             var data = Eval.find({week: document.getElementById("milestoneChoice").value}).fetch();
             for(var i = 0; i < data.length; i++){
             //  console.log(Student.findOne({_id: data[i].evaluatee}));
             data[i].name = Student.findOne({_id: data[i].evaluatee}).name;
             data[i].instructor = Instructor.findOne({_id: data[i].evaluator}).name;
             data[i].week = Milestone.findOne({_id: data[i].week}).name;
             //console.log(data[i].name);
           //  console.log(data[i].instructor);
           //  console.log(data[i].stars);
             data[i].effort = data[i].stars[0];
             data[i].att = data[i].stars[1];
             data[i].team = data[i].stars[2];
             data[i].tech = data[i].stars[3];
           }
         }

         if(selectStudent != "sortAll" && selectInstruct == "sortAll" && selectMile != "sortAll"){
           var data = [];
           var dataList = Eval.find({
             evaluatee: document.getElementById("studentChoice").value,
             week: document.getElementById("milestoneChoice").value
           }).fetch();
           console.log(dataList)
           dataList.forEach(function(element){
             element.name = $("#studentChoice option:selected").text();
             element.instructor = Instructor.findOne({_id: element.evaluator}).name;
             element.week = Milestone.findOne({_id: element.week}).name;
             element.effort = element.stars[0];
             element.att = element.stars[1];
             element.team = element.stars[2];
             element.tech = element.stars[3];
             data.push(element);
           });
         }
           if(selectStudent == "sortAll" && selectInstruct != "sortAll" && selectMile != "sortAll"){
             var data = [];
             var dataList = Eval.find({
               evaluator: document.getElementById("instructorChoice").value,
               week: document.getElementById("milestoneChoice").value
             }).fetch();
             console.log(dataList)
             dataList.forEach(function(element){
               element.name = Student.findOne({_id: element.evaluatee}).name;
               console.log(element.name)
               element.instructor = $("#instructorChoice option:selected").text();
               element.week = Milestone.findOne({_id: element.week}).name;
               element.effort = element.stars[0];
               element.att = element.stars[1];
               element.team = element.stars[2];
               element.tech = element.stars[3];
               data.push(element);
             });
           }
             if(selectStudent != "sortAll" && selectInstruct != "sortAll" && selectMile != "sortAll"){
               var data = [];
               var dataList = Eval.find({
                 evaluator: document.getElementById("instructorChoice").value,
                 evaluatee: document.getElementById("studentChoice").value,
                 week: document.getElementById("milestoneChoice").value
               }).fetch();
               console.log(dataList)
               dataList.forEach(function(element){
                 element.name = Student.findOne({_id: element.evaluatee}).name;
                 element.instructor = Instructor.findOne({_id: element.evaluator}).name;
                 element.week = Milestone.findOne({_id: element.week}).name;
                 element.effort = element.stars[0];
                 element.att = element.stars[1];
                 element.team = element.stars[2];
                 element.tech = element.stars[3];
                 data.push(element);
               });
             }
             var sortDescriptor = Template.instance().sortDescriptor.get();
                     var sortDirection = Template.instance().sortAscending.get() ? 1 : -1;
                      data.sort(function(student1, student2) {
                          if (sortDescriptor == "NameSort") {
                             return (student1.name.localeCompare(student2.name)) * sortDirection;
                          }
                       });
       // } catch (e) {
       //
       // }
           return data;

   //console.log(data);

 },
   allEvals: function(){
     return Eval.find({evaluator: Instructor.find({userId: Meteor.user()._id})._id});
   },
   students: function(){
     return Student.find();
   },
   instructors: function(){
     return Instructor.find();
   },
   milestone: function(){
     return Milestone.find();
   }
 });

 Template.viewEval.events({
   'click #confirmSubmitEval': function(event){
     var rating = $('#rating').data('userrating');
     var attitude = $('#attitude').data('userrating');
     var teamwork = $('#teamwork').data('userrating');
     var tech = $('#tech').data('userrating');

     comment = document.getElementById('textarea1').value;
     eaId = Instructor.findOne({userId: Meteor.user()._id})._id;
     listVal = document.getElementById('dataListInput').value;
     eId = $('#group [value="' + listVal + '"]').data('value');
     console.log($('#group [value="' + listVal + '"]'));
     console.log(eId)
     week = document.getElementById('week').value;
     sList = [rating, attitude, teamwork, tech ];

     for(var i = 0; i < sList.length; i++){
       if(sList[i] == null){
         sList[i] = 1;
       }
     }
     date = new Date();
    if(Eval.find({evaluator: eaId, evaluatee: eId, week: week}).fetch().length == 0){
      Meteor.call("sendEval", eaId, eId, comment, week, sList, date);
    }else{
      event.preventDefault();
    }
   },
   'click .submitbtn': function(event){
     Modal.show('submitEvalModal');
   },
   'click .rowClick': function(event){
     FlowRouter.go("/eval/" + event.target.id);

   },
   'change #studentChoice': function(event){
     event.preventDefault();
     _dep.changed();
   },
   'change #instructorChoice': function(event){
     event.preventDefault();
     _dep.changed();
   },
   'change #milestoneChoice': function(event){
     event.preventDefault();
     _dep.changed();
   },
   'click .sortIcon': function(event) {
       var sortDescriptor = Template.instance().sortDescriptor.get();

       if(event.target.id == sortDescriptor) {
         Template.instance().sortAscending.set(!Template.instance().sortAscending.get());
       } else {
         Template.instance().sortDescriptor.set(event.target.id);
         Template.instance().sortAscending.set(true);
       }
   },
   'click .resetbtn': function(event){
   //  event.preventDefault();
     console.log("Is it working");
     var elements = document.getElementsByTagName('select');
       for (var i = 0; i < elements.length; i++)
       {
           elements[i].selectedIndex = 0;
       }
   }
 });
