import React, { useState } from "react";

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  function handlefNameChange(event) {
    setFirstName(event.target.value);
  }

  function handlelNameChange(event) {
    setLastName(event.target.value);
  }

  return (
    <div className="container">
      <h1>
        Hello {firstName} {lastName}{" "}
      </h1>
      <form>
        <input
          name="fName"
          onChange={handlefNameChange}
          value={firstName}
          placeholder="First Name"
        />
        <input
          name="lName"
          onChange={handlelNameChange}
          value={lastName}
          placeholder="Last Name"
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
