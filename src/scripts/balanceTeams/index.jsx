// const balanceTeams = (players, ratings) => {
//     const sortedPlayers = players
//       .map((player, index) => ({
//         name: player,
//         rating: ratings[index] || 0,
//       }))
//       .sort((a, b) => b.rating - a.rating);
  
//     const balancedTeams = [[], [], [], []];
//     const teamRatings = [0, 0, 0, 0];
  
//     sortedPlayers.forEach((player) => {
//       const minTeamIndex = teamRatings.indexOf(Math.min(...teamRatings));
//       balancedTeams[minTeamIndex].push(player);
//       teamRatings[minTeamIndex] += player.rating;
//     });
  
//     return balancedTeams;
//   };
  
//   export default balanceTeams;

const balanceTeams = (players, ratings) => {
  const sortedPlayers = players
    .map((player, index) => ({
      name: player,
      rating: ratings[index] || 0,
    }))
    .sort((a, b) => b.rating - a.rating);

  const balancedTeams = [[], [], [], []];
  const teamRatings = [0, 0, 0, 0];

  // Function to get the index of the team with the lowest total rating
  const getMinTeamIndex = () => {
      let minIndex = 0;
      for (let i = 1; i < teamRatings.length; i++) {
          if (teamRatings[i] < teamRatings[minIndex] ||
              (teamRatings[i] === teamRatings[minIndex] && Math.random() < 0.5)) {
              minIndex = i;
          }
      }
      return minIndex;
  };

  sortedPlayers.forEach((player, index) => {
      const minTeamIndex = getMinTeamIndex();
      balancedTeams[minTeamIndex].push(player);
      teamRatings[minTeamIndex] += player.rating;
  });

  // Ensure each team has exactly 5 players
  const playersPerTeam = 5;
  let excessPlayers = [];
  for (let i = 0; i < balancedTeams.length; i++) {
      while (balancedTeams[i].length > playersPerTeam) {
          excessPlayers.push(balancedTeams[i].pop());
          teamRatings[i] -= balancedTeams[i][balancedTeams[i].length - 1].rating;
      }
  }

  excessPlayers.forEach(player => {
      const minTeamIndex = getMinTeamIndex();
      balancedTeams[minTeamIndex].push(player);
      teamRatings[minTeamIndex] += player.rating;
  });

  return balancedTeams;
};

export default balanceTeams;