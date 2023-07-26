import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import { getAllPersons } from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState();
  const [filteredName, setFilteredName] = useState("");
  const [notification, setNotification] = useState(null);
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
      <Notification
        notification={notification}
        setNotification={setNotification}
      />
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        fetchData={fetchData}
        setNotification={setNotification}
      />
      <h2>Numbers</h2>
      {persons && (
        <Persons
          persons={persons.filter((person) =>
            person?.name?.toLowerCase().includes(filteredName)
          )}
          setPersons={setPersons}
          setNotification={setNotification}
        />
      )}
    </div>
  );
};

export default App;
