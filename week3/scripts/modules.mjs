import byuiCourse from "./course.mjs";
import { setSectionSelection } from "./sections.mjs";
import { setTitle, renderSections } from "./output.mjs";

const sectionNumber = document.querySelector("#sectionNumber");
const enrollButton = document.querySelector("#enrollStudent");
const dropButton = document.querySelector("#dropStudent");

enrollButton.addEventListener("click", () => {
  const sectionNum = Number(sectionNumber.value);

  byuiCourse.changeEnrollment(sectionNum);
  renderSections(byuiCourse.sections);
});

dropButton.addEventListener("click", () => {
  const sectionNum = Number(sectionNumber.value);

  byuiCourse.changeEnrollment(sectionNum, false);
  renderSections(byuiCourse.sections);
});

setTitle(byuiCourse);
setSectionSelection(byuiCourse.sections);
renderSections(byuiCourse.sections);