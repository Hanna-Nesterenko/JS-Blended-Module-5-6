const coursesData = [
  {
    title: 'JavaScript Basics',
    price: 1200,
    students: 20,
    isActive: true,
  },
  {
    title: 'HTML & CSS',
    price: 900,
    students: 25,
    isActive: true,
  },
  {
    title: 'React Start',
    price: 1800,
    students: 0,
    isActive: false,
  },
];

///Етап 1 — Активні курси

const getActiveCourses = courses => courses.filter(course => course.isActive);

console.log(getActiveCourses(coursesData));
// [
//   {
//     title: 'JavaScript Basics',
//     price: 1200,
//     students: 20,
//     isActive: true
//   },
//   {
//     title: 'HTML & CSS',
//     price: 900,
//     students: 25,
//     isActive: true
//   }
// ]

///Етап 2 — Огляд активних курсів

const createCoursesOverview = courses => {
  const activeCourses = getActiveCourses(courses);
  const totalStudents = activeCourses.reduce(
    (acc, item) => (acc += item.students),
    0
  );
  const allHaveStudents = activeCourses.every(course => course.students > 0);

  const hasFreeCourse = activeCourses.some(course => course.price === 0);

  const sortedCourses = activeCourses.toSorted((a, b) => a.price - b.price);

  const titles = sortedCourses.map(
    course => `${course.title} — ${course.price} грн`
  );

  return {
    titles,
    totalStudents,
    allHaveStudents,
    hasFreeCourse,
  };
};

console.log(createCoursesOverview(coursesData));
// {
//   titles: ['HTML & CSS — 900 грн', 'JavaScript Basics — 1200 грн'],
//   totalStudents: 45,
//   allHaveStudents: true,
//   hasFreeCourse: false
// }

///Етап 3 — Клас курсу

class Course {
  #students;
  constructor(courseInfo) {
    this.title = courseInfo.title;
    this.price = courseInfo.price;
    this.#students = courseInfo.students;
  }

  enrollStudent() {
    this.#students += 1;
  }
  getStudentsCount() {
    return this.#students;
  }
  getInfo() {
    return `${this.title}: ${this.#students} студентів, ${this.price} грн`;
  }
}

const course = new Course({
  title: 'JavaScript Basics',
  price: 1200,
  students: 20,
});

course.enrollStudent();

console.log(course.getStudentsCount()); // 21

console.log(course.getInfo());
// JavaScript Basics: 21 студентів, 1200 грн

///Етап 4 — Каталог курсів

class CourseCatalog {
  #courses;
  constructor(courses) {
    const activeCourses = getActiveCourses(courses);
    const courseInstances = activeCourses.map(course => new Course(course));
    this.#courses = courseInstances;
  }

  addCourse(course) {
    this.#courses.push(course);
  }
  findCourse(title) {
    return this.#courses.find(course => course.title === title);
  }
  getTotalPotentialIncome() {
    return this.#courses.reduce(
      (total, course) => total + course.price * course.getStudentsCount(),
      0
    );
  }
}

const catalog = new CourseCatalog(coursesData);

console.log(catalog.findCourse('HTML & CSS').getInfo());
// HTML & CSS: 25 студентів, 900 грн

console.log(catalog.getTotalPotentialIncome()); // 46500
