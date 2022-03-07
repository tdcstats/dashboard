const PLATFORM_FEE = 5;

export default function stats(data) {
  let games = data.length;
  let flipped = 0;
  let fees = 0;
  let potFees = 0;
  let tdcFees = 0;
  let heads = { wins: 0, losses: 0 };
  let tails = { wins: 0, losses: 0 };
  let players = {};

  for (let i = 0; i < data.length; i++) {
    let game = data[i].value;

    if (!game.status) continue; // skip unresolved games

    let player = game.player;
    let bet = parseInt(game.amount[0]);
    let fee = bet * PLATFORM_FEE;

    if (!players[player])
      players[player] = { address: player, wins: 0, losses: 0 };

    if (game.status === "2") {
      // player wins
      game.heads ? heads.wins++ : tails.wins++;
      potFees += fee;
      players[player].wins++;
    } else {
      // player loses
      game.heads ? heads.losses++ : tails.losses++;
      tdcFees += (fee * 3) / 5;
      potFees += fee - (fee * 3) / 5;
      players[player].losses++;
    }

    flipped += Number(game.amount);
    fees += fee;
  }

  const { mostActive, lucky, unlucky } = calculatePlayerStats(players, games);

  return {
    games,
    fees,
    flipped,
    potFees,
    tdcFees,
    heads,
    tails,
    players,
    mostActive,
    lucky,
    unlucky,
    unique: Object.keys(players).length,
  };
}

function calculatePlayerStats(players, games) {
  let mostActive = "";
  let lucky = "";
  let unlucky = "";

  for (let player in players) {
    // initialize
    if (!mostActive) {
      mostActive = player;
      lucky = player;
      unlucky = player;
      continue;
    }

    // most active
    let leaderGames = players[mostActive].wins + players[mostActive].losses;
    let playerGames = players[player].wins + players[player].losses;
    if (playerGames > leaderGames) mostActive = player;

    // only use players that have played more games than the average
    if (playerGames >= Math.round(games / Object.keys(players).length)) {
      let luckyGames = players[lucky].wins + players[lucky].losses; // total games of lucky leader
      let unluckyGames = players[unlucky].wins + players[unlucky].losses; // total games of unlucky leader
      let playerWin = players[player].wins / playerGames; // win % of current player
      let playerLoss = players[player].losses / playerGames; // loss % of current player
      let luckyWin =
        players[lucky].wins / (players[lucky].wins + players[lucky].losses); // win % of lucky leader
      let unluckyLoss =
        players[unlucky].losses /
        (players[unlucky].wins + players[unlucky].losses); // loss % of unlucky leader

      if (playerWin >= luckyWin) {
        if (playerWin > luckyWin) lucky = player;
        else playerGames > luckyGames ? (lucky = player) : null; // tie breaker total games played if same win %
      }

      if (playerLoss >= unluckyLoss) {
        if (playerLoss > unluckyLoss) unlucky = player;
        else playerGames > unluckyGames ? (unlucky = player) : null; // tie breaker total games played if same loss %
      }
    }
  }

  return {
    mostActive: players[mostActive],
    lucky: players[lucky],
    unlucky: players[unlucky],
  };
}
