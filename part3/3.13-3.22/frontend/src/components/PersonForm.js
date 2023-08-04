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
    const theSamePerson = persons.some(
      (person) => person?.name?.toLowerCase() === newName.toLowerCase()
    );

    if (!newName || !phoneNumber) {
      alert("fill all fields");
    } else if (theSamePerson) {
      const findPerson = persons.find(
        (person) => person?.name?.toLowerCase() === newName.toLowerCase()
      );
      const replacePhoneNumber = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      if (replacePhoneNumber) {
        updatePerson(findPerson.id, {
          ...findPerson,
          number: newPerson.number,
        })
          .then((response) => {
            setNotification({
              type: "notification",
              text: `${findPerson.name} number ${findPerson.number}  edited to ${response.number}`,
            });
            fetchData();
            setNewName("");
            setPhoneNumber("");
          })
          .catch((err) =>
            setNotification({
              type: "error",
              text: `${err.response.data.error}`,
            })
          );
      }
    } else {
      createPerson(newPerson)
        .then((response) => {
          setPersons((prevValue) => [...prevValue, response]);
          setNewName("");
          setPhoneNumber("");
          setNotification({
            type: "notification",
            text: `Added ${response.name}`,
          });
        })
        .catch((err) => {
          setNotification({
            type: "error",
            text: `${err.response.data.error}`,
          });
        });
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
