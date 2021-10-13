import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Container } from 'reactstrap';
 
const DashBoard = () => {

  const history = useHistory()
  const [roomId, setRoomId] = useState('');
  const [newRoomId, setNewRoomId] = useState('');

  const createRoom = () => {
    const roomId = Math.floor(Math.random() * 899999 + 100000)
    setNewRoomId(roomId)
  }
  
  return (
      <Container fluid className="p-0">
        <button onClick={createRoom}>CREATE ROOM</button>
        <br />
        <br />
        <span>{newRoomId}</span>
        {newRoomId !== '' && <button onClick={() => history.push(`/room/${newRoomId}`)}>JOIN THE ROOM</button>}
        <br />
        <br />
        <br />
        <input type="text" value={roomId} onChange={e => setRoomId(e.target.value)} />
        <button onClick={() => history.push(`/room/${roomId}`)}>JOIN ROOM</button>
      </Container>
  );
};
 
export default DashBoard;