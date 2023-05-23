import axios from 'axios';
import {useEffect, useState} from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState();
  const [filteredName, setFilteredName] = useState('');

  const changeFilterName = (event) => {
    setFilteredName(event.target.value);
  };
  const fetchData = () => {
    axios
      .get('http://localhost:3001/persons')
      .then((response) => {
        setPersons(response.data);
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
      <PersonForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      {persons && (
        <Persons
          persons={persons.filter((person) =>
            person.name.toLocaleLowerCase().includes(filteredName)
          )}
        />
      )}
    </div>
  );
};

export default App;
