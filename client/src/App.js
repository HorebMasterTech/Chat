import { BrowserRouter , Routes, Route } from "react-router-dom";
import React, {useEffect} from 'react';


import PageRender from "./customRouter/PageRender";

import Accueil from "./pages/accueil";
import Connexion from "./pages/connexion";
import Inscription from "./pages/inscription";

import Alert from "./components/alert/Alert";
import Header from "./components/header/Header";
import StatusModal from "./components/statusModal";

import { useSelector, useDispatch } from 'react-redux';
import { refreshToken } from "./redux/actions/authAction";
import { getPosts } from "./redux/actions/postAction";
import { getSuggestions } from "./redux/actions/suggestionsAction";

import { getNotifies } from "./redux/actions/notifyAction";

import io from 'socket.io-client';

import { GLOBALTYPES } from "./redux/actions/globalTypes";
import SocketClient from './SocketClient';

import CallModal from "./components/message/CallModal";

import Peer from 'peerjs';

function App() {

  const { auth, status, modal, call } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken())

    const socket = io() 
    dispatch({ type: GLOBALTYPES.SOCKET, payload: socket })
    return () => socket.close()
  }, [dispatch]);

  useEffect(() => {
    if(auth.token) {
      dispatch(getPosts(auth.token))
      dispatch(getSuggestions(auth.token))
      dispatch(getNotifies(auth.token))
    }
  }, [dispatch, auth.token]);

  useEffect(() => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }
    else if (Notification.permission === "granted") {}
    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {}
      });
    }
  },[])

  useEffect(() => {
    const newPeer = new Peer(undefined, {
      path: '/', secure: true
    })
    dispatch({ type: GLOBALTYPES.PEER, payload: newPeer })
  }, [dispatch])


  return (
    <BrowserRouter>
        <Alert />
        <input type="checkbox" id="theme" />
        <div className={`App ${(status || modal) && 'mode'}`}>
          <div className='bg-gray-100 main'>
          {auth.token && <Header/>}
          {auth.token && <SocketClient />}
          {status && <StatusModal />}
          {call && <CallModal />}
          <Routes>
            <Route exact path="/" element={auth.token ? <Accueil /> : <Connexion />} />
            <Route exact path="/inscription" element={<Inscription />} />
            
              <Route exact path="/:page" element={<PageRender />} />
              <Route exact path="/:page/:id" element={<PageRender />} />
          </Routes>
          </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
