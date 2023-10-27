import { CoursePart } from "../types";
import Part from "./Part";
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Content = ({ part }: { part: CoursePart }) => {
  const coursePart = () => {
    switch (part.kind) {
      case "basic":
        return <p>{part.description}</p>;
      case "group":
        return <p>project exercises ${part.groupProjectCount}</p>;
      case "background":
        return (
          <>
            <p>{part.description}</p>
            <p>project exercises: ${part.backgroundMaterial}</p>
          </>
        );
      case "special":
        return (
          <>
            <p>{part.description}</p>
            <p>
              Regiments skills:{" "}
              <span>{part?.requirements.map((value) => value).join(", ")}</span>
            </p>
          </>
        );
      default:
        return assertNever(part);
    }
  };

  return (
    <>
      <h2>
        {part.name} {part.exerciseCount}
      </h2>
      <Part content={coursePart()} />
    </>
  );
};
export default Content;
