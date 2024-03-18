import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { startTimer, stopTimer } from "../store/slices/timerSlice";
import styled from "styled-components";

export const Form = () => {
  const [newTodo, setNewTodo] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const isValidTime = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(newTodo);
    if (!isValidTime) {
      alert("Не забудьте двоеточие ':' ");
      setNewTodo("");
      return;
    }
    dispatch(stopTimer(newTodo));
    dispatch(startTimer(newTodo));
    navigate("/countdown");
  };

  return (
    <BlockStyled>
      <h3>Countdown timer</h3>
      <FormStyled onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter new time ..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button type="submit">start</button>
      </FormStyled>
    </BlockStyled>
  );
};

const BlockStyled = styled("div")`
  width: 500px;
  height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 35px;
  margin: 0 auto;
  margin-top: 100px;
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  h3 {
    font-size: 28px;
    color: RGB(0, 172, 255);
  }
  input {
    width: 180px;
    height: 35px;
    border: 1.5px solid RGB(0, 172, 255);
    border-radius: 8px;
    padding-left: 20px;
    font-size: 20px;
  }
  ::placeholder {
    padding-left: 20px;
    font-size: 15px;
  }
  button {
    width: 50px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    font-size: 16px;
    background-color: rgb(60, 179, 113);
    color: white;
  }
`;

const FormStyled = styled("form")`
  display: flex;
  gap: 12px;
`;
