import React, { useState } from "react";
import { useDispatch } from "react-redux";

import socket from "../api";

import { useNavigate } from "react-router-dom";

const Home = () => {
  const history = useNavigate();
  const dispatch = useDispatch();

  const [room, setRoom] = useState("");
  const [name, setName] = useState("");

  const joinRoomHandler = (event) => {
    event.preventDefault();

    socket.connect();
    socket.emit("join", { name, room });

    socket.on("checkUser", (exist) => {
      if (exist) {
        history.push("/");
        socket.disconnect();
        dispatch({ type: "CLEAR_NAME" });
        event.target.parentElement.children[0].value = "";
        event.target.parentElement.children[1].value = "";
      } else {
        socket.connect();
        dispatch({
          type: "GET_NAME",
          payload: {
            name,
            room,
          },
        });
        history.push(`/${room}`);
      }
    });
  };

  return (
    <main id="home">
      <form>
        <select onChange={(event) => setRoom(event.target.value)}>
          <option value="" defaultValue>
            ------
          </option>
          <option value="JavaScript">JavaScript</option>
          <option value="General">General</option>
          <option value="PHP">PHP</option>
          <option value="HTML/CSS">HTML/CSS</option>
          <option value="Python">Python</option>
        </select>
        <input type="text" onChange={(event) => setName(event.target.value)} />
        <button type="submit" onClick={joinRoomHandler}>
          DOŁĄCZ
        </button>
      </form>
    </main>
  );
};

export default Home;
