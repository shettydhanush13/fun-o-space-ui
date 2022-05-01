import './App.css';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import DashBoard from './pages/home'
import Room from './pages/room'
import io from "socket.io-client";
import { useEffect, useState, useReducer } from 'react';
import GlobalState, { reducer } from "./globalStore";

const initialState = {
  lang: 'KA'
};

function App() {
  const [socket, setSocket] = useState(null)
  const [state, dispatch] = useReducer(reducer, initialState);

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
    <GlobalState initialState={state} dispatch={dispatch}>
      <BrowserRouter>
        <Switch>
            <Route exact path={'/'} component={DashBoard} />
            {socket && <Route exact path={'/room/:roomId'}><Room socket={socket}/></Route>}
        </Switch>
      </BrowserRouter>
    </GlobalState>
  );
}

export default App;
