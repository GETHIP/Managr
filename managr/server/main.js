import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  /*if(Student.find().count() < 15){
  Student.insert({"name":"bill","profilePicture":"http://","age":5,"strengths":"none","description":"tall","grade":4,"attendance":"three","assignments":"none","school":"West Dodge"});
  }*/
  //Student.insert({"name":"Roger","profilePicture":"http://","age":5,"strengths":["Relator","Cool","Smart","Fun","Nice"], "description":"cool","grade":[[4]],"attendance": ["yes"], "assignments":"Work", "school":"mm"});
  Meteor.publish("Student", function(){
    return Student.find();
  });
});
