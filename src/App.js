import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositorys, setRepository] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepository(response.data);
    })
  }, []);

  async function handleAddRepository() { 
    const response = await api.post('/repositories', { 
      title: `Ǹovo projeto ${Date.now()}`,
      url: 'https:github.com/joaomenna1',
      techs: ["Node js", "React js", "React native"]
    });

    const repository = response.data;
    console.log(respository);

    setRepository([...repositorys, repository]);
  }

  async function handleRemoveRepository(id) {
     api.delete(`/repositories/${id}`).then(() => {
       const Index = repositorys.findIndex(repos => repos.id === id);
       repositorys.splice(Index, 1);
       setRepository([...repositorys], repositorys);
     })
    
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositorys.map(repository => 
            <li key={repository.id}> 
              {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id) }>Remover</button>
          </li>
          )
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
