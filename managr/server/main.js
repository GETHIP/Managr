import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  Meteor.publish("Student", function(){
    return Student.find();
  });
  Meteor.publish("Teacher", function(){
    return Teacher.find();
  })
  for(var i = Student.find().count(); i < 15; i++){
      Student.insert({
      "name": "ben" + i,
      "profilePicture": "x",
      "age": 5,
      "strengths": ['Input', 'Command', 'Restorative', 'Learner', 'Futuristic'],
      "description": "tall",
      "grade": ['100%'],
      "attendance": [true, false, true, true, false, false, true, true, false, true, true, false],
      "assignments": [['12', '100']],
      "school": "West Dodge",
      "email": "ben@ben.com",
      "getHipYear": 2
      });
  }
  for(var i = Instructor.find().count(); i < 15; i++){
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
