import { deletePerson } from "../services/persons";

function Persons({ persons, setPersons, setNotification }) {
  const handleDelete = (id) => {
    const person = persons.find((p) => p.id === id);
    const confirmDeletePerson = window.confirm(
      `Do you want to delete ${person.name}`
    );

    if (confirmDeletePerson) {
      deletePerson(id)
        .then((response) => {
          setPersons(persons.filter((item) => item.id !== person.id));
          setNotification({
            type: "notification",
            text: `${person.name} has been removed from server`,
          });
        })
        .catch((err) =>
          setNotification({
            type: "error",
            text: `Information of ${person.name} has already been removed from server`,
          })
        );
    }
  };
  return (
    <>
      {persons.length ? (
        <ul>
          {persons.map((person) => (
            <li key={person.id}>
              {person.name} {person.number}{" "}
              <button onClick={() => handleDelete(person.id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <>There is no person wth that name</>
      )}
    </>
  );
}

export default Persons;
