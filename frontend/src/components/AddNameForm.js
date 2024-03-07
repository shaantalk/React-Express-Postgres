import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const AddNameForm = ({ onSubmit }) => {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(name);
    setName("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control"
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="mt-2">
        Add
      </Button>
    </Form>
  );
};

export default AddNameForm;
