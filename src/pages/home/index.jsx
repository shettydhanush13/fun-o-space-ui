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
        <header className="gameHeader">
          <div>
              {/* <p>Room ID : {roomId}</p>
              <p>Players Joined : {users.length}/4</p> */}
          </div>
          <div>
              {/* <button onClick={() => users.length !== 4 ? alert('4 players required to start the game') : socket.emit('start-game', roomId, users)}>Start game</button>
              <button onClick={() => socket.emit('leave-room', roomId)}>Leave room</button> */}
          </div>
        </header>
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