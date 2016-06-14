import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  Meteor.publish("Student", function(){
    return Student.find();
  });

  for(var i = Student.find().count(); i < 15; i++){
      Student.insert({"name":"ben" + i,
      "profilePicture":"x",
      "age":5,
      "strengths":['Input', 'Command', 'Restorative', 'Learner', 'Futuristic'],
      "description":"tall",
      "grade": ['100%'],
      "attendance":['true'],
      "assignments":[['12', '100']],
      "school":"West Dodge",
      "email": "ben@ben.com"
    });
  }
  console.log(Student.findOne({"name":"ben1"}));
});
