import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import { mocData } from "./data";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState(mocData);
  const [filteredPersons, setFilteredPersons] = useState(persons);
  const [filteredName, setFilteredName] = useState("");

  const changeFilterName = (event) => {
    setFilteredName(event.target.value);
  };

  useEffect(() => {
    const search = persons.filter((person) =>
      person.name.toLocaleLowerCase().includes(filteredName)
    );
    setFilteredPersons(search);
  }, [filteredName, persons]);

  return (
    <div>
      <Filter value={filteredName} handleChange={changeFilterName} />
      <h2>Phonebook</h2>
      <PersonForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
