/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/AppContext";
import { useNavigate } from "react-router";

const AllPrograms = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const onEdit = (program) => {
    navigate(`/view-program/${program.id}`, {
      state: { programData: program },
    });
  };
  const AllPrograms = async () => {
    try {
      const req = await actions.getAllPrograms();
      alert(`${req.message}`);
    } catch (error) {
      alert("connection failed", error);
    }
  };

  useEffect(() => {
    if (store.user.id) {
      AllPrograms();
    }
  }, [store.user.id]);

  const handleDelete = async (id) => {
    try {
      const req = await actions.deleteProgram(id);
      alert(`delete success`);
      window.location.reload();
    } catch (error) {
      alert("connection failed", error);
    }
  };

  return (
    <div>
      <h1>All programs:</h1>
      <div>
        <ul>
          {store.programs.map((program) => (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-around",
                border: "1px solid yellow",
                maxWidth: "700px",
              }}
              key={program.id}
            >
              <li
                style={{
                  width: "350px",
                  listStyle: "none",
                  textAlign: "left",
                }}
              >
                Name: {program.name}
              </li>
              <li style={{ width: "350px" }}>
                Description: {program.description}
              </li>
              <button onClick={() => onEdit(program)}> EDIT</button>
              <button onClick={() => handleDelete(program.id)}> DELETE</button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AllPrograms;
