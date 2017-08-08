const users = [
  {
    id: 1,
    name: 'Andrew',
    schoolId: 101
  },
  {
    id: 2,
    name: 'Jessica',
    schoolId: 999
  }
];

const grades = [
  {
    id: 1,
    schoolId: 101,
    grade: 86
  },
  {
    id: 2,
    schoolId: 999,
    grade: 100
  },
  {
    id: 3,
    schoolId: 101,
    grade: 80
  }
];

const getGrades = schoolId => {
  return new Promise((resolve, reject) => {
    resolve(grades.filter(grade => grade.schoolId === schoolId));
  });
};

const getUser = id => {
  return new Promise((resolve, reject) => {
    const user = users.find(user => user.id === id);

    if (user) {
      resolve(user);
    } else {
      reject(`Unable to find user with id of ${id}.`);
    }
  });
};

const getStatus = userId => {
  // grab a students grades and average them
  return getUser(userId).then(user => {
    // get the grades
    return getGrades(user.schoolId).then(grades => {
      let average = 0;

      if (grades.length > 0) {
        average =
          grades.map(grade => grade.grade).reduce((a, b) => a + b) /
          grades.length;
      }

      return `${user.name} has a ${average}% in the class.`;
    });
  });
};

const getStatusAsync = async userId => {
  const user = await getUser(userId);
  const grades = await getGrades(user.schoolId);

  let average = 0;

  if (grades.length > 0) {
    average =
      grades.map(grade => grade.grade).reduce((a, b) => a + b) / grades.length;
  }

  return `${user.name} has a ${average}% in the class.`;
};

// getUser(1).then(console.log).catch(console.log);
// getGrades(101).then(console.log).catch(console.log);
getStatusAsync(1).then(console.log).catch(console.log);
