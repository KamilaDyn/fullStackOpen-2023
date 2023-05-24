function CoursesList({ courses }) {
  return (
    <>
      {courses.map((part) => (
        <tr key={part.id}>
          <td>{part.name}</td>
          <td>{part.exercises}</td>
        </tr>
      ))}
    </>
  );
}

export default CoursesList;
