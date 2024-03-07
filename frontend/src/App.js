import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import AddNameForm from "./components/AddNameForm";
import NamesList from "./components/NamesList";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [names, setNames] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_HOST || ""}/api/names`)
      .then((res) => res.json())
      .then((data) => setNames(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleAddName = (name) => {
    fetch(`${process.env.REACT_APP_BACKEND_HOST || ""}/api/names`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    })
      .then((res) => res.json())
      .then((data) => setNames([...names, data]))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <Container>
      <Row className="mt-5">
        <Col>
          <h2>Add Name</h2>
          <AddNameForm onSubmit={handleAddName} />
        </Col>
        <Col>
          <h2>Names List</h2>
          <NamesList names={names} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
