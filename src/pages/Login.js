import React, { useState } from 'react';
import './Login.css'
import api from '../services/api'
import ReactFileReader from 'react-file-reader';

// import { Container } from './styles';

export default function  Login({ history }){

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  async function handleSubmit(e){
      e.preventDefault();
      
      const formData = { content, title }
      const response = await api.post('/document/create', {formData})
      console.log(response)
      alert(response.data.message)
      if(response.status === 201) {
        history.push('/documents')
      }
  };

    return (
        <div className="login-container">
        <form onSubmit={handleSubmit}>
            <input
            placeholder="Digite o titulo do documento"
            value={title}
            onChange={e => setTitle(e.target.value)}
            />
            <input
            placeholder="Digite o conteudo do documento"
            value={content}
            onChange={e => setContent(e.target.value)}
            />
            <button 
            type="submit">
                Criar Documento
            </button>
        </form>
    </div>
    );
  }
