import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";
import './home.css'

const Home = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <div className="container">
      <h1>Home Page</h1>
      <form onSubmit={handleSubmitForm} className="form">
        <label htmlFor="email">Email ID :- </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br/>
        <br/>
        
        <label htmlFor="room">Room Number :- </label>
        <input
          type="text"
          id="room"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <br/>
        <br/>
        <button className="join">Join</button>
      </form>
      {/* <Form onSubmit={handleSubmitForm}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email"
          // id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label >Room No.</Form.Label>
        <Form.Control type="text"
          // id="room"
          value={room}
          onChange={(e) => setRoom(e.target.value)} placeholder="Password" />
      </Form.Group>
     
      <Button variant="primary" type="submit">
        Join
      </Button>
    </Form> */}
    </div>
  );
};

export default Home;
