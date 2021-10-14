import './App.css';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import DashBoard from './pages/home'
import Room from './pages/room'
import io from "socket.io-client";
import { useEffect, useState } from 'react';

function App() {
  const [socket, setSocket] = useState(null)

  const connect = async () => {
    const connectionOptions = {
      "force new connection": true,
      reconnectionAttempts: "Infinity",
      timeout: 10000,
      transports: ["websocket"],
    };
    setSocket(io("https://fun-o-space-service.herokuapp.com", connectionOptions))
  }

  useEffect(() => {
    connect()
  }, [])

  return (
    <BrowserRouter>
      <Switch>
          <Route exact path={'/'} component={DashBoard} />
          {socket && <Route exact path={'/room/:roomId'}><Room socket={socket}/></Route>}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
