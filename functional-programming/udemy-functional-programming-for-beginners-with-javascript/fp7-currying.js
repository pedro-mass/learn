// Functional Programming for Beginners Exercise

// create transforms to go from studentGrades, to studentFeedback

const studentGrades = [
  { name: "Joe", grade: 88 },
  { name: "Jen", grade: 94 },
  { name: "Steph", grade: 77 },
  { name: "Allen", grade: 60 },
  { name: "Gina", grade: 54 }
];

const messages = {
  a: "Excellent Job",
  b: "Nice Job",
  c: "Well done",
  d: "What happened",
  f: "Not good"
};

function letterGrade(points) {
  if (points >= 90) {
    return "a";
  } else if (points >= 80) {
    return "b";
  } else if (points >= 70) {
    return "c";
  } else if (points >= 60) {
    return "d";
  } else {
    return "f";
  }
}

function feedBack(feedBackRules) {
  return function(student) {
    const grade = letterGrade(student.grade);
    const message = feedBackRules[grade];
    return `${message} ${student.name}, you got an ${grade}`;
  };
}

const gradeFeedback = studentGrades.map(feedBack(messages));

console.log(gradeFeedback);

/*
studentFeedback === [
  'Nice Job Joe, you got an b', 
  'Excellent Job Jen, you got an a', 
  'Well done Steph, you got an c', 
  'What happened Allen, you got an d', 
  'Not good Gina, you got an f'
]
*/
