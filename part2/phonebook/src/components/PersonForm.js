import { useState } from "react";
function PersonForm({ persons, setPersons }) {
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
      id: persons.length + 1,
    };

    if (!newName || !phoneNumber) {
      alert("fill all fields");
    } else if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons((prevValue) => [...prevValue, newPerson]);
      setNewName("");
      setPhoneNumber("");
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
