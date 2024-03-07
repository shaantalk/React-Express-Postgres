import React from "react";
import { ListGroup } from "react-bootstrap";

const NamesList = ({ names }) => {
  return (
    <ListGroup>
      {names.map((name) => (
        <ListGroup.Item key={name.id}>{name.name}</ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default NamesList;
