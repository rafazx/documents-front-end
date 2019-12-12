import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import ReactFileReader from 'react-file-reader';
import api from '../services/api'
import './Documents.css'

export default function Document() {

  const [ documents, setDocuments ] = useState([]);
  const [file , setFile] = useState('');

  useEffect(() => {
    (async function loadDocuments() {
      const response = await api.get('/');
      setDocuments(response.data)
      console.log(documents)
    })();
  },[file]);


  async function handleFiles(file, id){
    console.log(id)
    console.log(file)
    const document = documents.filter(e => e._id === id);
    document[0].file = { 
      name : file.fileList[0].name,
      type : file.fileList[0].type,
      base64 : file.base64
    };
    console.log(documents.filter(e => e._id === id))
  }

  async function updateDocument(id){
    const document = documents.filter(e => e._id === id);
    const response = await api.put(`document/${id}`, {
      file : document[0].file
    });
    setFile(response.data.fileUrl);
    document[0].fileUrl = response.data.fileUrl;
  }

    return  (
      <div className="main-container">
      <Link to="/" className="go-back">
      voltar
      </Link>
      {documents.length > 0 ? 
      <ul>
          {documents.map(document => (
            <li key={document._id}>
              <footer>
              <h4><strong>{document.title}</strong></h4>
              <div className="content">
              <p>{document.content}</p>
              <a href={document.fileUrl? document.fileUrl : ''}>{document.fileUrl ? 'PDF' : ''}</a>
              </div>
              </footer>
          
              <div className="buttons">
              <ReactFileReader handleFiles={(file) => handleFiles(file, document._id)}  base64={true}>
                <button>Adicionar Pdf</button>
              </ReactFileReader><br/>
  
              <button type="button" onClick={() => updateDocument(document._id)}>
                Atualizar Documento
              </button>           
              </div>
              
            </li>
            
          ))}
      </ul>
       : 
          <div className="empty">Não tem documentos </div>
       }
       </div>
    );
  }
