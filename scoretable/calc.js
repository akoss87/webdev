function getTeamStat(stats, team) {
  var stat = stats[team];
  if (typeof stat === 'undefined')
    stats[team] = stat = { played: 0, wins: 0, draws: 0, losts: 0, goalsFor: 0, goalsAgainst: 0, goalsDiff: 0, points: 0 };
  return stat;
}

function calcTable(matches) {
  // 1. feldolgozzuk a meccseredményeket -> kiszámoljuk az egyes csapatok statisztikáit
  var stats = {};

  for (var i = 0; i < matches.length; i++) {
    var match = matches[i];

    //var result = splitResult(match.result);

    var homeTeamStat = getTeamStat(stats, match.homeTeam);
    var awayTeamStat = getTeamStat(stats, match.awayTeam);

    homeTeamStat.played++;
    awayTeamStat.played++;

    if (match.homeGoals > match.awayGoals) {
      homeTeamStat.wins++;
      homeTeamStat.points += 3;
      awayTeamStat.losts++;
    }
    else if (match.homeGoals < match.awayGoals) {
      homeTeamStat.losts++;
      awayTeamStat.wins++;
      awayTeamStat.points += 3;
    }
    else {
      homeTeamStat.draws++;
      homeTeamStat.points++;
      awayTeamStat.draws++;
      awayTeamStat.points++;
    }

    homeTeamStat.goalsFor += match.homeGoals;
    homeTeamStat.goalsAgainst += match.awayGoals;
    homeTeamStat.goalsDiff += match.homeGoals - match.awayGoals;

    awayTeamStat.goalsFor += match.awayGoals;
    awayTeamStat.goalsAgainst += match.homeGoals;
    awayTeamStat.goalsDiff += match.awayGoals - match.homeGoals;
  }

  // 2. a statisztika objektumot tömbbé (listává) alakítjuk
  var match = [];
  for (var team in stats) {
    if (stats.hasOwnProperty(team)) {
      var stat = stats[team];
      stat.teamName = team;
      match.push(stat);
    }
  }

  // 3. lerendezzük a listát pontszám szerint
  match.sort(function (a, b) {
    if (a.points < b.points)
      return 1;
    else if (a.points > b.points)
      return -1;
    else
      return 0;
  });

  return match;
}
