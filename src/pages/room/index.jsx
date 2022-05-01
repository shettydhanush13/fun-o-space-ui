import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Container } from 'reactstrap';
import Avatar from '../../components/avatar'
import LeaderBoard from '../../components/leaderBoard'
import Chatroom from '../../components/chatroom'
import ResultAnimation from '../../components/result'
import lang from '../../assets/translation.json'
import {GlobalStateContext, GlobalDispatchContext, LANG} from '../../globalStore'

import './styles.scss'

const Room = ({ socket }) => {

    const globalState = useContext(GlobalStateContext)
    const dispatch = useContext(GlobalDispatchContext)    
    const history = useHistory()

    const [scoreboard, setScoreboard] = useState({})
    const [roomId] = useState(history.location.pathname.split('/')[2])
    const [users, setUsers] = useState([])
    const [userMap, setUserMap] = useState(null)
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
    
    return (
        <Container fluid className="p-0">
            <header className="gameHeader">
                <div>
                    <p>{lang[globalState.lang]['ROOM ID']} :  &nbsp;{roomId}</p>
                    <p>{lang[globalState.lang]['PLAYERS JOINED']} :  &nbsp;{users.length}/4</p>
                    <p>Language :  &nbsp;<select name="language" id="language" className='selectBox' onChange={(e) => dispatch({ type: LANG, payload: e.target.value })}>
                        <option value="KA">KANNADA</option>
                        <option value="EN">ENGLISH</option>
                    </select></p>
                </div>
                <div>
                    <button onClick={() => users.length !== 4 ? alert('4 players required to start the game') : socket.emit('start-game', roomId, users)}>{lang[globalState.lang]['START GAME']}</button>
                    <button onClick={() => socket.emit('leave-room', roomId)}>{lang[globalState.lang]['LEAVE ROOM']}</button>
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
                            ? <span className={`role_${i+1}`}>{lang[globalState.lang][gameRoles[user]]}</span>
                            :
                            <button onClick={() => socket.emit('guess-kalla', gameRoles[user] === 'KALLA', roomId, gameRoles, scoreboard)} className={`role_${i+1}`}>{lang[globalState.lang]['KALLA']} ?</button>}
                            </>
                        ))}
                    </div>
                    <div className="scoreBoard">
                        {scoreboard && <LeaderBoard userMap={userMap} data={scoreboard}/>}
                    </div>               
                </div>
                <Chatroom socket={socket} userMap={userMap} roomId={roomId}/>
            </div>
        </Container>
    );
};
 
export default Room;