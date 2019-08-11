import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import io from 'socket.io-client';

import './Main.css';

import logo from "../assets/logo.svg";
import like from "../assets/like.svg";
import dislike from "../assets/dislike.svg";
import istamatch from '../assets/itsamatch.png';

export default function Main({match}) {

  const [users, setUsers] = useState([]);
  const [matchDev, setMatchDev] = useState(null);

  useEffect( () => { 
    async function loadUsers() {
      const response = await api.get( 'devs', {
        headers: {
          user: match.params.id
        }
      })
      setUsers(response.data);
    }
    loadUsers();
  }, [match.params.id]); // Ao alterar esse ID, chama essa função

  useEffect( () => {
    const socket = io('http://localhost:3333', {
      query: { user: match.params.id}
    });
    
    /*  socket.emit('hello', {
        message: "Hello World!"
      }) */

    socket.on('match', dev => {
      setMatchDev(dev);
    });
    
  }, [match.params.id]);

  async function handleDislike(id) {
    await api.post(`/devs/${id}/dislikes`, null, {
      headers: { user: match.params.id }
    })
    setUsers( users.filter( user => user._id !== id ) );
  }
  
  async function handleLike(id) {
    await api.post(`/devs/${id}/likes`, null, {
      headers: { user: match.params.id }
    })
    setUsers( users.filter( user => user._id !== id ) );
  }

  return(
    <div className="main-container">
      <Link to="/">
        <img src={logo} alt="Tindev" />
      </Link>
      {
        users.length > 0 ? (
          <ul>
            { users.map( user => (
              <li key={user._id}>
                <img src={user.avatar} alt={user.name} />
                <footer>
                  <strong>{user.name}</strong>
                  <p>{user.bio}</p>
                </footer>
                <div className="buttons">
                  <button type="button" onClick={ () => handleDislike(user._id)}>
                    <img src={dislike} alt="Dislike" />
                  </button>
                  <button type="button" onClick={ () => handleLike(user._id) }>
                    <img src={like} alt="Like" />
                  </button>
                </div>
              </li>
            ))}
        </ul>
        ) : (
          <div className="empty">
            Sem usuários para exibir
          </div>
        )
      }
      
      { matchDev && (
        <div className="match-container">
          <img src={istamatch} alt="It's a Match" className="itsamatch" />
          
          <img src={matchDev.avatar} alt="avatar" className="avatar" />
          <strong>{matchDev.name}</strong>
          <p>{matchDev.bio}</p>

          <button type="button" onClick={ () => setMatchDev(null) }>
            Fechar
          </button>
        </div>
      ) }

    </div>
  )
}