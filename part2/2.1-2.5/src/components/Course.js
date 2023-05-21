import CoursesList from "./CoursesList";
import Header from "./Header";
import Total from "./Total";

function Course({ course }) {
  const courseTotal = course.parts
    .map((part) => part["exercises"])
    .reduce((acc, curr) => acc + curr, 0);
  return (
    <div>
      <Header title={course.name} />
      <table>
        <tbody>
          <CoursesList courses={course.parts} />
        </tbody>
      </table>
      <Total total={courseTotal} />
    </div>
  );
}

export default Course;
