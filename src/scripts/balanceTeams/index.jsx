const balanceTeams = (players, ratings) => {
    const sortedPlayers = players
      .map((player, index) => ({
        name: player,
        rating: ratings[index] || 0,
      }))
      .sort((a, b) => b.rating - a.rating);
  
    const balancedTeams = [[], [], [], []];
    const teamRatings = [0, 0, 0, 0];
  
    sortedPlayers.forEach((player) => {
      const minTeamIndex = teamRatings.indexOf(Math.min(...teamRatings));
      balancedTeams[minTeamIndex].push(player);
      teamRatings[minTeamIndex] += player.rating;
    });
  
    return balancedTeams;
  };
  
  export default balanceTeams;