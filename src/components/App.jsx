import React from "react";
import Heading from "./Heading";
import Card from "./Card";
import Footer from "./Footer";
import contacts from "./../contacts";

function App() {
  return (
    <div>
      <Heading />

      <Card
        name={contacts[0].name}
        email={contacts[0].email}
        phone={contacts[0].phone}
        source={contacts[0].imgURL}
      />
      <Card
        name={contacts[1].name}
        email={contacts[1].email}
        phone={contacts[1].phone}
        source={contacts[1].imgURL}
      />
      <Card
        name={contacts[2].name}
        email={contacts[2].email}
        phone={contacts[2].phone}
        source={contacts[2].imgURL}
      />
      <Footer />
    </div>
  );
}

export default App;
