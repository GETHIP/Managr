import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  Meteor.publish("Student", function(){
    return Student.find();
  });

  for(var i = Student.find().count() + Instructor.find().count(); i < 15; i++){
      Student.insert({
      "name": "ben" + i,
      "profilePicture": "x",
      "age": 5,
      "strengths": ['Input', 'Command', 'Restorative', 'Learner', 'Futuristic'],
      "description": "tall",
      "grade": ['100%'],
      "attendance": [true, false, true, true, false, false, true, true, false, true, true, false, false, true],
      "assignments": [['12', '100']],
      "school": "West Dodge",
      "email": "ben@ben.com",
      "getHipYear": 2
      });
      Instructor.insert({
      "name": "roger"+ i,
      "profilePicture": "x",
      "strengths": ['Command','Relator','Fun','Cool','Nice'],
      "description": "Teacher",
      "email": "Teacher@teacher.com"
      });
  }
  console.log(Student.findOne({"name":"ben1"}));
  console.log(Instructor.findOne({"name":"roger1"}));
});
