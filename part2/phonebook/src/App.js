import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import { getAllPersons } from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState();
  const [filteredName, setFilteredName] = useState("");

  const changeFilterName = (event) => {
    setFilteredName(event.target.value);
  };
  const fetchData = () => {
    getAllPersons()
      .then((response) => {
        setPersons(response);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Filter value={filteredName} handleChange={changeFilterName} />
      <h2>Phonebook</h2>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        fetchData={fetchData}
      />
      <h2>Numbers</h2>
      {persons && (
        <Persons
          persons={persons.filter((person) =>
            person.name.toLocaleLowerCase().includes(filteredName)
          )}
          setPersons={setPersons}
        />
      )}
    </div>
  );
};

export default App;
