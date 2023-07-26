import { useState } from "react";
import { createPerson, updatePerson } from "../services/persons";

function PersonForm({ persons, setPersons, fetchData, setNotification }) {
  const [newName, setNewName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  };
  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };
  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: phoneNumber,
    };
    const theSamePerson = persons?.some(
      (person) => person?.name?.toLowerCase() === newName.toLowerCase()
    );

    if (!newName || !phoneNumber) {
      alert("fill all fields");
    } else if (theSamePerson) {
      const idPerson = persons.find(
        (person) => person?.name?.toLowerCase() === newName.toLowerCase()
      );
      const replacePhoneNumber = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      if (replacePhoneNumber) {
        updatePerson(idPerson.id, { ...idPerson, number: newPerson.number });
        fetchData();
        setNewName("");
        setPhoneNumber("");
      }
    } else {
      createPerson(newPerson)
        .then((response) => {
          setPersons((prevValue) => [...prevValue, response]);
          setNewName("");
          setPhoneNumber("");
          setNotification({
            type: "notification",
            text: `Added ${newPerson.name}`,
          });
        })
        .catch((err) => alert(`There were a problem with ${err.message}`));
    }
  };
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handlePersonChange} />
      </div>
      <div>
        number: <input value={phoneNumber} onChange={handlePhoneNumberChange} />
      </div>

      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}

export default PersonForm;
