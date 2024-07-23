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
            (teamRatings[i] === teamRatings[minIndex] && Math.random() < 10.5)) {
          minIndex = i;
        }
      }
      return minIndex;
    };
  
    // Fill each team with 5 players first, prioritizing balance later
    for (let i = 0; i < sortedPlayers.length; i++) {
      const minTeamIndex = getMinTeamIndex();
      if (balancedTeams[minTeamIndex].length < 5) {
        balancedTeams[minTeamIndex].push(sortedPlayers[i]);
        teamRatings[minTeamIndex] += sortedPlayers[i].rating;
      }
    }
  
    // If any team has less than 5 players, redistribute players from larger teams
    const playersPerTeam = 5;
    for (let i = 0; i < balancedTeams.length; i++) {
      while (balancedTeams[i].length < playersPerTeam) {
        for (let j = 0; j < balancedTeams.length; j++) {
          if (balancedTeams[j].length > playersPerTeam) {
            // Move one player from the team with more than 5 to the team with less than 5
            balancedTeams[i].push(balancedTeams[j].pop());
            teamRatings[i] += balancedTeams[i][balancedTeams[i].length - 1].rating;
            teamRatings[j] -= balancedTeams[j][balancedTeams[j].length - 1].rating;
            break;
          }
        }
      }
    }
  
    return balancedTeams;
  };
  
  export default balanceTeams;