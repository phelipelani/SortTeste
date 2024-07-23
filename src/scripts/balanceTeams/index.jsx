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


// const balanceTeams = (jogadores, avaliacoes) => {
//     if (jogadores.length !== avaliacoes.length) {
//         throw new Error("O número de jogadores deve corresponder ao número de avaliações.");
//     }

//     // Cria uma lista de jogadores com suas avaliações
//     const jogadoresComAvaliacoes = jogadores.map((jogador, index) => ({
//         nome: jogador,
//         avaliacao: avaliacoes[index] || 0,
//     }));

//     // Ordena os jogadores pela avaliação (decrescente)
//     const jogadoresOrdenados = jogadoresComAvaliacoes.sort((a, b) => b.avaliacao - a.avaliacao);

//     // Inicializa os times
//     const timesBalanceados = [[], [], [], []];
//     const avaliacoesTimes = [0, 0, 0, 0];

//     // Distribui os 4 melhores jogadores como cabeça de chave
//     for (let i = 0; i < 4; i++) {
//         timesBalanceados[i].push(jogadoresOrdenados[i]);
//         avaliacoesTimes[i] += jogadoresOrdenados[i].avaliacao;
//     }

//     // Distribui o restante dos jogadores de forma equilibrada
//     for (let i = 4; i < jogadoresOrdenados.length; i++) {
//         // Encontra o time com a menor soma de avaliações
//         let indiceTimeMinimo = 0;
//         for (let j = 1; j < avaliacoesTimes.length; j++) {
//             if (avaliacoesTimes[j] < avaliacoesTimes[indiceTimeMinimo]) {
//                 indiceTimeMinimo = j;
//             }
//         }
//         // Adiciona o jogador ao time com a menor soma de avaliações
//         timesBalanceados[indiceTimeMinimo].push(jogadoresOrdenados[i]);
//         avaliacoesTimes[indiceTimeMinimo] += jogadoresOrdenados[i].avaliacao;
//     }

//     // Garantir que todos os times tenham exatamente 5 jogadores
//     const jogadoresPorTime = 5;
//     while (timesBalanceados.some(time => time.length < jogadoresPorTime)) {
//         for (let i = 0; i < timesBalanceados.length; i++) {
//             if (timesBalanceados[i].length < jogadoresPorTime) {
//                 for (let j = 0; j < timesBalanceados.length; j++) {
//                     if (timesBalanceados[j].length > jogadoresPorTime) {
//                         const jogadorMovido = timesBalanceados[j].pop();
//                         timesBalanceados[i].push(jogadorMovido);
//                         avaliacoesTimes[i] += jogadorMovido.avaliacao;
//                         avaliacoesTimes[j] -= jogadorMovido.avaliacao;
//                         break;
//                     }
//                 }
//             }
//         }
//     }

//     return timesBalanceados;
// };

// console.log(balanceTeams)

// export default balanceTeams;