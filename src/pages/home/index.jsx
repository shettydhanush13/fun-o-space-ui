import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Container } from 'reactstrap';
import './styles.scss'

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
        <div className="gameLobby">
          <button onClick={createRoom}>CREATE ROOM</button>
          {newRoomId !== '' && <span>ROOM ID : {newRoomId}</span>}
          {newRoomId !== '' && <button className="joinGameButton" onClick={() => history.push(`/room/${newRoomId}`)}>JOIN GAME</button>}
          <p>GOT A ROOM ID ?</p>
          <div className="joinRoomSection">
            <input type="text" placeholder='ENTER ROOM ID HERE' value={roomId} onChange={e => setRoomId(e.target.value)} />
            <button onClick={() => history.push(`/room/${roomId}`)}>JOIN</button>
          </div>
        </div>
      </Container>
  );
};
 
export default DashBoard;