import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import UserCard from "../components/userCard";
import { useGetUsersQuery } from "../services/usersApi";
import { addUser } from "../redux/users";
import AddOrEditModal from "../components/addOrEditModal";
import "./library.scss";
import NavBar from "../components/navBar";

export default function Library() {
  const { users } = useSelector((state) => state.users);
  const { error, isLoading } = useGetUsersQuery(10);
  const [showEditModal, setShowEditModal] = useState(false);
  const dispatch = useDispatch();

  const renderUsersContent = () => {
    if (error) {
      return <div>ERROR!</div>;
    } else if (isLoading) {
      return <div>Loading...</div>;
    } else if (users) {
      return (
        <div className="users-section">
          {users.map((user) => {
            return <UserCard key={user.id} user={user} />;
          })}
        </div>
      );
    }
  };

  const handleAddClose = () => setShowEditModal(false);
  const handleAddShow = () => setShowEditModal(true);

  const saveNewUser = (newUserData) => {
    const newUser = { ...newUserData, id: users.length };
    dispatch(addUser(newUser));
    handleAddClose();
  };

  return (
    <div id="users_library">
      <NavBar handleAddShow={handleAddShow} />

      {renderUsersContent()}
      {
        <AddOrEditModal
          modalType="Add"
          showModal={showEditModal}
          handleClose={handleAddClose}
          handleChanges={saveNewUser}
        />
      }
    </div>
  );
}
