import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import FormInputs from "./formInputs";
import { initialValues } from "../constants/inputs";

export default function AddOrEditModal({
  modalType,
  showModal,
  handleClose,
  user,
  handleChanges,
}) {
  const [inputs, setInputs] = useState(user || initialValues);
  const [errors, setErrors] = useState({});

  const InputChanged = (id, value) => {
    setInputs({
      ...inputs,
      [id]: value,
    });

    if (!!errors[id]) {
      setErrors({
        ...errors,
        [id]: null,
      });
    }
  };

  const setAllErrors = (newErrors) => {
    setErrors(newErrors);
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{`${modalType} User`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormInputs
          inputs={inputs}
          user={user}
          InputChanged={InputChanged}
          errors={errors}
          setAllErrors={setAllErrors}
          closeModal={handleClose}
          handleChanges={handleChanges}
        />
      </Modal.Body>
    </Modal>
  );
}
