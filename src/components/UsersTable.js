/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/AppContext";

const UsersTable = () => {
  const { store, actions } = useContext(Context);
  const [users, setUsers] = useState(store.users);

  const getAllUsersAndPlans = async () => {
    try {
      if (store.user.is_admin) {
        await actions.getAllUsers();
      }
    } catch (error) {
      console.error("Error getting users from UsersTable", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await actions.deleteUser(id);
      setUsers((prevUsers) => prevUsers.filter((user) => user.user_id !== id));
    } catch (error) {
      console.error("Error deleting user from user table", error);
    }
  };

  useEffect(() => {
    if (store.user?.id) {
      getAllUsersAndPlans();
    }
  }, [store.user.id, users]);

  return (
    <>
      {store.user.is_admin ? (
        <section style={{ textAlign: "center" }}>
          <div>
            <table>
              <thead>
                <tr>
                  <th>Users</th>
                </tr>
                <tr>
                  <th>firstname</th>
                  <th>lastname</th>
                  <th>phone</th>
                  <th>email</th>
                  <th>sex</th>
                  <th>birthday</th>
                  <th>plan</th>
                  <th>expire on</th>
                  <th>actions</th>
                </tr>
              </thead>
              <tbody>
                {store.users?.length > 0 &&
                  store.users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.firstname}</td>
                      <td>{user.lastname}</td>
                      <td>{user.phone}</td>
                      <td>{user.email}</td>
                      <td>{user.sex}</td>
                      <td>{actions.dateFormater(user.birthday)}</td>
                      <td>{user.plan}</td>
                      <td>{user.expires_date}</td>
                      <td>
                        <button onClick={() => handleDelete(user.user_id)}>
                          X
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : (
        <h1>Access Denied!</h1>
      )}
    </>
  );
};

export default UsersTable;
