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


const balanceTeams = (jogadores, avaliacoes) => {
    const jogadoresOrdenados = jogadores
      .map((jogador, index) => ({
        nome: jogador,
        avaliacao: avaliacoes[index] || 0,
      }))
      .sort((a, b) => b.avaliacao - a.avaliacao);

    const timesBalanceados = [[], [], [], []];
    const avaliacoesTimes = [0, 0, 0, 0];

    // Função para obter o índice do time com a menor pontuação total
    const obterIndiceTimeMinimo = () => {
      let indiceMinimo = 0;
      for (let i = 1; i < avaliacoesTimes.length; i++) {
        if (avaliacoesTimes[i] < avaliacoesTimes[indiceMinimo] ||
            (avaliacoesTimes[i] === avaliacoesTimes[indiceMinimo] && Math.random() < 0.5)) {
          indiceMinimo = i;
        }
      }
      return indiceMinimo;
    };

    // Preencher cada time com 5 jogadores inicialmente
    for (let i = 0; i < jogadoresOrdenados.length; i++) {
      const indiceTimeMinimo = obterIndiceTimeMinimo();
      if (timesBalanceados[indiceTimeMinimo].length < 5) {
        timesBalanceados[indiceTimeMinimo].push(jogadoresOrdenados[i]);
        avaliacoesTimes[indiceTimeMinimo] += jogadoresOrdenados[i].avaliacao;
      }
    }

    // Garantir que todos os times tenham exatamente 5 jogadores e a diferença de pontuação seja no máximo 15
    const jogadoresPorTime = 5;
    const diferencaMaxima = 15; // Diferença máxima de pontos entre os times
    while (true) {
      let redistribuido = false;
      for (let i = 0; i < timesBalanceados.length; i++) {
        if (timesBalanceados[i].length < jogadoresPorTime) {
          for (let j = 0; j < timesBalanceados.length; j++) {
            if (timesBalanceados[j].length > jogadoresPorTime) {
              const diferencaAtual = Math.max(
                ...avaliacoesTimes.map(avaliacao => Math.abs(avaliacao - avaliacoesTimes[i]))
              );
              if (diferencaAtual <= diferencaMaxima) {
                // Mover um jogador do time com mais de 5 para o time com menos de 5
                timesBalanceados[i].push(timesBalanceados[j].pop());
                avaliacoesTimes[i] += timesBalanceados[i][timesBalanceados[i].length - 1].avaliacao;
                avaliacoesTimes[j] -= timesBalanceados[j][timesBalanceados[j].length - 1].avaliacao;
                redistribuido = true;
                break;
              }
            }
          }
        }
      }
      if (!redistribuido) break; // Se não houve redistribuição, terminar o loop
    }

    return timesBalanceados;
};

export default balanceTeams;