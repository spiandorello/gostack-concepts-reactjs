import React, { useState, useEffect } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  
  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);
  
  async function handleAddRepository() {
    await api.post(`/repositories`, {
      title: 'Ma oii',
      url: 'http://github.com/spiandorello',
      techs: [
        'Node.js',
        'JAVA'
      ]
    }).then(response => setRepositories(prevState => [...prevState, response.data]));
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    setRepositories(prevState => prevState.filter(item => item.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((item, key) => (
          <li key={key}>
            {item.title}
            <button onClick={() => handleRemoveRepository(item.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
