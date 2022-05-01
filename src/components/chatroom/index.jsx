import React, { useState, useContext } from 'react';
import Avatar from '../../components/avatar'
import lang from '../../assets/translation.json'
import { GlobalStateContext } from '../../globalStore'

import './styles.scss'

const Chatroom = ({ socket, userMap, roomId }) => {

    const globalState = useContext(GlobalStateContext)
    const [messages, setMessages] = useState([])

    socket.off('recieved-message').on("recieved-message", (msg) => {
        const m = [...messages]
        setMessages([...m, msg])
        const objDiv = document.getElementById("messageContainer");
        objDiv.scrollTop = objDiv.scrollHeight;
    });


    const sendMessage = (e) => {
        e.preventDefault();
        socket.emit('new-message', document.getElementById('message').value, roomId, socket.id)
        document.getElementById('message').value = ''
    }
    
    return (
        <div className="chatRoom">
            <p>{lang[globalState.lang]['CHAT ROOM']}</p>
            <hr />
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
                <input className='submit' type="submit" value={lang[globalState.lang]['SEND']} />
            </form>
        </div>
    );
};
 
export default Chatroom;