const courses = [
  {
    subject: "CSE",
    number: 110,
    title: "Introduction to Programming",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course will introduce students to programming. It will introduce the building blocks of programming languages including variables, expressions, selection, repetition, functions, and objects.",
    technology: ["Python"],
    completed: true
  },
  {
    subject: "WDD",
    number: 130,
    title: "Web Fundamentals",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course introduces students to the World Wide Web and to careers in web site design and development.",
    technology: ["HTML", "CSS"],
    completed: true
  },
  {
    subject: "CSE",
    number: 111,
    title: "Programming with Functions",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others.",
    technology: ["Python"],
    completed: true
  },
  {
    subject: "CSE",
    number: 210,
    title: "Programming with Classes",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course introduces the notion of classes and objects.",
    technology: ["C#"],
    completed: false
  },
  {
    subject: "WDD",
    number: 131,
    title: "Dynamic Web Fundamentals",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course builds on prior experience in Web Fundamentals and programming.",
    technology: ["HTML", "CSS", "JavaScript"],
    completed: true
  },
  {
    subject: "WDD",
    number: 231,
    title: "Web Frontend Development I",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course explores frontend web development using HTML, CSS, and JavaScript.",
    technology: ["HTML", "CSS", "JavaScript"],
    completed: false
  }
];

const courseList = document.querySelector("#course-list");
const totalCredits = document.querySelector("#total-credits");

const allButton = document.querySelector("#all");
const cseButton = document.querySelector("#cse");
const wddButton = document.querySelector("#wdd");

function displayCourses(courseArray) {
  courseList.innerHTML = "";

  courseArray.forEach((course) => {
    const courseCard = document.createElement("div");

    courseCard.classList.add("course-card");

    if (course.completed) {
      courseCard.classList.add("completed");
    }

    courseCard.innerHTML = `
      <h3>${course.subject} ${course.number}</h3>
      <p>${course.title}</p>
      <p>${course.credits} credits</p>
    `;

    courseList.appendChild(courseCard);
  });

  const credits = courseArray.reduce(
    (total, course) => total + course.credits,
    0
  );

  totalCredits.textContent = credits;
}

allButton.addEventListener("click", () => {
  displayCourses(courses);
});

cseButton.addEventListener("click", () => {
  const cseCourses = courses.filter(
    (course) => course.subject === "CSE"
  );

  displayCourses(cseCourses);
});

wddButton.addEventListener("click", () => {
  const wddCourses = courses.filter(
    (course) => course.subject === "WDD"
  );

  displayCourses(wddCourses);
});

displayCourses(courses);