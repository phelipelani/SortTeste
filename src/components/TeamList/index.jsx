import React from 'react';
import styled from 'styled-components';

const TeamContainer = styled.div`
  margin-top: 20px;

`;

const TeamList = ({ teams }) => (
  <div>
    <h2>Times das Lendas</h2>
    {teams.map((team, teamIndex) => (
      <TeamContainer key={teamIndex}>
        <h3>
          Time {teamIndex + 1} (Total: {team.reduce((sum, player) => sum + player.rating, 0)} pontos)
        </h3>
        <ul>
          {team.map((player, index) => (
            <li key={index}>
              {player.name} - {player.rating} pontos
            </li>
          ))}
        </ul>
      </TeamContainer>
    ))}
  </div>
);

export default TeamList;