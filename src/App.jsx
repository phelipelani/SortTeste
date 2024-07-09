import React, { useState } from 'react';
import PlayerInput from './components/PlayerInput';
import TeamList from './components/TeamList';
import balanceTeams from './scripts/balanceTeams';
import GlobalStyles from './styles/GlobalStyles';
import styled from 'styled-components';

const AppContainer = styled.div`
  padding: 20px;
`;

const App = () => {
  const [playerList, setPlayerList] = useState('');
  const [players, setPlayers] = useState([]);
  const [playerRatings, setPlayerRatings] = useState({});
  const [teams, setTeams] = useState([[], [], [], []]);

  const handlePlayerListChange = (e) => {
    setPlayerList(e.target.value);
  };

  const handleParsePlayers = () => {
    const playerArray = playerList
      .split('\n')
      .filter((line) => line.trim() !== '') // Remover linhas vazias
      .map((line) => {
        const parts = line.split(' - ');
        return parts.length > 1 ? parts[1] : parts[0]; // Assumindo o formato "número - jogador" ou apenas "jogador"
      });
    setPlayers(playerArray);
  };

  const handleRatingChange = (index, rating) => {
    setPlayerRatings({ ...playerRatings, [index]: Number(rating) });
  };

  const handleSubmit = () => {
    const balancedTeams = balanceTeams(players, playerRatings);
    setTeams(balancedTeams);
  };

  return (
    <AppContainer>
      <GlobalStyles />
      <h1>Sorteio de Times</h1>
      <textarea
        value={playerList}
        onChange={handlePlayerListChange}
        placeholder="Cole a lista de jogadores aqui"
        rows="10"
        cols="30"
      />
      <button onClick={handleParsePlayers}>Listar Jogadores</button>
      
      {players.length > 0 && (
        <div>
          <h2>Notas dos Jogadores</h2>
          {players.map((player, index) => (
            <PlayerInput
              key={index}
              player={player}
              index={index}
              handleRatingChange={handleRatingChange}
            />
          ))}
          <button onClick={handleSubmit}>Balancear Times</button>
        </div>
      )}
      {teams[0].length > 0 && <TeamList teams={teams} />}
    </AppContainer>
  );
};

export default App;