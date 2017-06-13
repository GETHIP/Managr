var getSurveysCompleted = function(student) {
    var surveysAssignments = student.survey;
    var completed = 0;
    for(var i = 0; i < studentSurvey.length; i++) {
        if(studentSurvey[i].completed) {
            completed++;
        }
    }
    return completed;
}
