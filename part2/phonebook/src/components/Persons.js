function Persons({ persons }) {
  return (
    <>
      {persons.length ? (
        <ul>
          {persons.map((person) => (
            <li key={person.id}>
              {person.name} {person.number}
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
