import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { startTimer, resetTimer } from "../store/slices/timerSlice";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const Timer = () => {
  const [isCounting, setIsCounting] = useState(false);
  const timeLeft = useSelector((state) => state.timer.timeLeft);
  const isActive = useSelector((state) => state.timer.isActive);
  const timerStatus = useSelector((state) => state.timer.timerStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    let timer;
    if (isActive && timeLeft !== "00:00") {
      timer = setInterval(() => {
        const [minute, second] = timeLeft.split(":").map(Number);

        if (minute === 0 && second === 0) {
          clearInterval(timer);
          dispatch(resetTimer(false));
        } else {
          let secondCounter = second - 1;
          let minuteCounter = minute;

          if (secondCounter < 0) {
            secondCounter = 59;
            minuteCounter -= 1;
          }

          const newCounter = `${
            minuteCounter < 10 ? "0" : ""
          }${minuteCounter}:${secondCounter < 10 ? "0" : ""}${secondCounter}`;
          dispatch(startTimer(newCounter));
        }
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isActive, timeLeft, dispatch]);
  const handleStart = () => {
    dispatch(resetTimer(true));
    setIsCounting(true);
  };

  const handleStop = () => {
    dispatch(resetTimer(false));
    setIsCounting(false);
  };

  const handleReset = () => {
    dispatch(startTimer(timerStatus));
    dispatch(resetTimer(false));
    setIsCounting(false);
  };
  return (
    <BoxStyled>
      <TimeBlockStyled>
        <h1>{timeLeft}</h1>
        <StyledButtonBlock>
          {isCounting ? (
            <button onClick={handleStop}>pause</button>
          ) : (
            <button onClick={handleStart}>start</button>
          )}

          <button onClick={handleReset}>restart</button>
          <Link to="/">
            <button>new time</button>
          </Link>
        </StyledButtonBlock>
      </TimeBlockStyled>
    </BoxStyled>
  );
};

const BoxStyled = styled.div`
  width: 600px;
  height: 400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  margin-top: 100px;
  border-radius: 15px;
  background-color: RGB(0, 172, 255);
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
`;

const TimeBlockStyled = styled.div`
  width: 450px;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  margin: 0 auto;
  border-radius: 12px;
  background-color: white;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
    rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
  h1 {
    color: rgb(60, 179, 113);
    padding-bottom: 25px;
    font-size: 58px;
  }
`;
const StyledButtonBlock = styled.div`
  display: flex;
  gap: 30px;
  button {
    width: 70px;
    height: 70px;
    border-radius: 50px;
    border: none;
    cursor: pointer;
    font-size: 18px;
    background-color: rgb(60, 179, 113);
    color: white;
  }
`;
