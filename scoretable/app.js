function splitResult(value) {
  var resArray = value.split("-");
  return {
    homeGoals: parseInt(resArray[0]),
    awayGoals: parseInt(resArray[1]),
  };
}

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

    var result = splitResult(match.result);

    var homeTeamStat = getTeamStat(stats, match.homeTeam);
    var awayTeamStat = getTeamStat(stats, match.awayTeam);

    homeTeamStat.played++;
    awayTeamStat.played++;

    if (result.homeGoals > result.awayGoals) {
      homeTeamStat.wins++;
      homeTeamStat.points += 3;
      awayTeamStat.losts++;
    }
    else if (result.homeGoals < result.awayGoals) {
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

    homeTeamStat.goalsFor += result.homeGoals;
    homeTeamStat.goalsAgainst += result.awayGoals;
    homeTeamStat.goalsDiff += result.homeGoals - result.awayGoals;

    awayTeamStat.goalsFor += result.awayGoals;
    awayTeamStat.goalsAgainst += result.homeGoals;
    awayTeamStat.goalsDiff += result.awayGoals - result.homeGoals;
  }

  // 2. a statisztika objektumot tömbbé (listává) alakítjuk
  var result = [];
  for (var team in stats) {
    if (stats.hasOwnProperty(team)) {
        var stat = stats[team];
        stat.teamName = team;
        result.push(stat);
    }
  }

  // 3. lerendezzük a listát pontszám szerint
  result.sort(function (a, b) {
      if (a.points < b.points)
        return 1;
      else if (a.points > b.points)
        return -1;
      else
        return 0;
    });

  return result;
}

var data = [
  { homeTeam: 'Club Brugge', awayTeam: 'Borussia Dortmund', result: '0-1' },
  { homeTeam: 'Monaco', awayTeam: 'Atletico Madrid', result: '1-2' },
  { homeTeam: 'Atletico Madrid', awayTeam: 'Club Brugge', result: '3-1' },
  { homeTeam: 'Borussia Dortmund', awayTeam: 'Monaco', result: '3-0' },
  { homeTeam: 'Club Brugge', awayTeam: 'Monaco', result: '1-1' },
  { homeTeam: 'Borussia Dortmund', awayTeam: 'Atletico Madrid', result: '4-0' },
  { homeTeam: 'Monaco', awayTeam: 'Club Brugge', result: '0-4' },
  { homeTeam: 'Atletico Madrid', awayTeam: 'Borussia Dortmund', result: '2-0' },
  { homeTeam: 'Atletico Madrid', awayTeam: 'Monaco', result: '2-0' },
  { homeTeam: 'Borussia Dortmund', awayTeam: 'Club Brugge', result: '0-0' },
  { homeTeam: 'Club Brugge', awayTeam: 'Atletico Madrid', result: '0-0' },
  { homeTeam: 'Monaco', awayTeam: 'Borussia Dortmund', result: '0-2' },
];


var table = calcTable(data)
for (var i = 0; i < table.length; i++) {
    var row = table[i];
    console.log(`${row.teamName} | ${row.played} | ${row.wins} | ${row.draws} | ${row.losts} | ${row.goalsFor} | ${row.goalsAgainst} | ${row.goalsDiff} | ${row.points}`);
}
