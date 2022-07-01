import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteUser, editUser } from "../redux/users";
import DeleteModal from "./deleteModal";
import AddOrEditModal from "./addOrEditModal";
import "./userCard.scss";
import { Trash3, Pen } from "react-bootstrap-icons";

export default function UserCard({ user }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const dispatch = useDispatch();
  const {
    nameTitle,
    firstName,
    lastName,
    email,
    userImage,
    city,
    country,
    streetName,
    streetNumber,
    id,
  } = user;

  const handleDeleteClose = () => setShowDeleteModal(false);
  const handleDeleteShow = () => setShowDeleteModal(true);

  const handleDelete = () => {
    dispatch(deleteUser(id));
    handleDeleteClose();
  };

  const handleEditClose = () => setShowEditModal(false);
  const handleEditeShow = () => setShowEditModal(true);

  const handleChanges = (updatedUser) => {
    dispatch(editUser(updatedUser));
    handleEditClose();
  };
  const defaultSrcNewUsers =
    "https://www.freeiconspng.com/thumbs/person-icon/person-icon-person-icon-17.jpg";
  return (
    <>
      <Card>
        <Card.Img
          variant="top"
          src={userImage ? userImage : defaultSrcNewUsers}
          alt="No Image"
        />
        <Card.Body>
          <div className="content">
            <Card.Title>{`${nameTitle} ${firstName} ${lastName}`}</Card.Title>
            <Card.Text>{`${email}`}</Card.Text>
            <Card.Text>{`${country} ${city} ${streetName} ${streetNumber}`}</Card.Text>
          </div>
          <div className="btns">
            <Trash3
              className="btn"
              color="#DC143C"
              onClick={handleDeleteShow}
            />
            <Pen className="btn" color="#0d6efd" onClick={handleEditeShow} />
          </div>
        </Card.Body>
      </Card>
      {
        <DeleteModal
          showModal={showDeleteModal}
          handleClose={handleDeleteClose}
          handleDelete={handleDelete}
        />
      }
      {
        <AddOrEditModal
          modalType="Edit"
          showModal={showEditModal}
          handleClose={handleEditClose}
          user={user}
          handleChanges={handleChanges}
        />
      }
    </>
  );
}
