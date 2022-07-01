import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { inputsToEdit } from "../constants/inputs";
import { useSelector } from "react-redux";
import "./formInputs.scss";

export default function FormInputs({
  inputs = {},
  InputChanged,
  errors,
  setAllErrors,
  closeModal,
  handleChanges,
}) {
  const { users } = useSelector((state) => state.users);
  const [validated, setValidated] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    Object.keys(inputs).forEach((key) => {
      if (!inputs[key] || inputs[key] === "")
        newErrors[key] = "please fill this filed";
    });
    if (inputs.firstName.length < 3) {
      newErrors.firstName = "name must be at least 3 characters";
    }
    const emailRegex =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

    if (!emailRegex.test(inputs.email)) {
      newErrors.email = "email not valid";
    }

    const emails = users
      .filter((user) => !(inputs.id && inputs.id === user.id))
      .map((user) => user.email);

    if (emails.includes(inputs.email)) {
      newErrors.email = "email already exists";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setAllErrors(formErrors);
    } else {
      setValidated(true);
      handleChanges(inputs);
    }
  };

  return (
    <Form id="my_form" noValidate validated={validated} onSubmit={handleSubmit}>
      {inputsToEdit.map((input) => (
        <Form.Group className="mb-3" key={input.id}>
          <Form.Label>{input.label}</Form.Label>
          <Form.Control
            type={input.type}
            placeholder={input.label}
            value={inputs[input.id] || ""}
            onChange={(e) => InputChanged(input.id, e.target.value)}
            isInvalid={!!errors[input.id]}
          />
          <Form.Control.Feedback type="invalid">
            {errors[input.id]}
          </Form.Control.Feedback>
        </Form.Group>
      ))}
      <div className="btns">
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
        <Button variant="primary" type="submit">
          Save
        </Button>
      </div>
    </Form>
  );
}
