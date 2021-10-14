import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container } from 'reactstrap';
import Avatar from '../../components/avatar'
import LeaderBoard from '../../components/leaderBoard'
import ResultAnimation from '../../components/result'

import './styles.scss'

const Room = ({ socket }) => {

    const [scoreboard, setScoreboard] = useState({})

    const history = useHistory()
    const [roomId] = useState(history.location.pathname.split('/')[2])
    const [users, setUsers] = useState([])
    const [userMap, setUserMap] = useState(null)
    const [messages, setMessages] = useState([])
    const [gameRoles, setGameRoles] =  useState(null)
    const [guessed, setGuessed] = useState(false)
    const [result, setResult] = useState('success')

    useEffect(async () => {
        const username = await prompt('enter username')
        socket.emit('join-room', roomId, username)
    }, [roomId])

    socket.off('room-details').on("room-details", (details) => {
        for(const user of details.users) {
            scoreboard[user] = 0 
        }
        setUserMap(details.userMap)
        setScoreboard(scoreboard)
        setUsers(details.users)
    });

    socket.off('recieved-message').on("recieved-message", (msg) => {
        const m = [...messages]
        setMessages([...m, msg])
        const objDiv = document.getElementById("messageContainer");
        objDiv.scrollTop = objDiv.scrollHeight;
    });

    socket.off('room-left').on("room-left", () => history.push('/'))

    socket.off('game-started').on("game-started", (mapRoles) => {
        setGuessed(false)
        setGameRoles(mapRoles)
    })

    socket.off('guess-result').on("guess-result", (result, newScore) => {
        setResult(result)
        setScoreboard(newScore)
        setGuessed(true)
        setTimeout(() => {
            socket.emit('start-game', roomId, users)
        }, 5000)
    })

    const sendMessage = (e) => {
        e.preventDefault();
        socket.emit('new-message', document.getElementById('message').value, roomId, socket.id)
        document.getElementById('message').value = ''
    }
    
    return (
        <Container fluid className="p-0">
            <header className="gameHeader">
                <div>
                    <p>Room ID : {roomId}</p>
                    <p>Players Joined : {users.length}/4</p>
                </div>
                <div>
                    <button onClick={() => users.length !== 4 ? alert('4 players required to start the game') : socket.emit('start-game', roomId, users)}>Start game</button>
                    <button onClick={() => socket.emit('leave-room', roomId)}>Leave room</button>
                </div>
            </header>
            
            <div className="arena">
                <div className="gameWrapper">
                    <div className="GameContainer">
                        {guessed && <ResultAnimation type={result}/>}
                        {users.map((user, i) => (
                            <>
                            {userMap && <Avatar className={`avatar_${i+1}`} id={user} data={{name: (socket.id === user) ? "ME" : (userMap[user] || user), image: ''}}/>}
                            {gameRoles && (socket.id === user || gameRoles[socket.id] !== "POLICE")   
                            ? <span className={`role_${i+1}`}>{gameRoles[user]}</span>
                            :
                            <button onClick={() => socket.emit('guess-kalla', gameRoles[user] === 'KALLA', roomId, gameRoles, scoreboard)} className={`role_${i+1}`}>kalla ?</button>}
                            </>
                        ))}
                    </div>
                    <div className="scoreBoard">
                        {scoreboard && <LeaderBoard userMap={userMap} data={scoreboard}/>}
                    </div>               
                </div>
                <div className="chatRoom">
                    <p>CHAT ROOM</p>
                    <br />
                    <section id='messageContainer'>
                        {messages.map(({user, msg}) => (
                            <div style={{display: 'flex'}}>
                                {userMap && socket.id !== user && <Avatar data={{name: (socket.id === user) ? "M E" : (userMap[user] || user), image: ''}}/>}
                                <p className={socket.id === user ? 'myText' : 'othersText'}>{socket.id === user ? '' : ``}{msg}</p>
                            </div>
                        ))}
                    </section>    
                    <form autoComplete='off' onSubmit={sendMessage}>
                        <input type="text" id='message'/>
                        <input className='submit' type="submit" value="SEND" />
                    </form>
                </div>
            </div>
        </Container>
    );
};
 
export default Room;