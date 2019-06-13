// function splitResult(value) {
//   var resArray = value.split("-");
//   return {
//     homeGoals: parseInt(resArray[0]),
//     awayGoals: parseInt(resArray[1]),
//   };
// }

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

// var data = [
//   { homeTeam: 'Club Brugge', awayTeam: 'Borussia Dortmund', result: '0-1' },
//   { homeTeam: 'Monaco', awayTeam: 'Atletico Madrid', result: '1-2' },
//   { homeTeam: 'Atletico Madrid', awayTeam: 'Club Brugge', result: '3-1' },
//   { homeTeam: 'Borussia Dortmund', awayTeam: 'Monaco', result: '3-0' },
//   { homeTeam: 'Club Brugge', awayTeam: 'Monaco', result: '1-1' },
//   { homeTeam: 'Borussia Dortmund', awayTeam: 'Atletico Madrid', result: '4-0' },
//   { homeTeam: 'Monaco', awayTeam: 'Club Brugge', result: '0-4' },
//   { homeTeam: 'Atletico Madrid', awayTeam: 'Borussia Dortmund', result: '2-0' },
//   { homeTeam: 'Atletico Madrid', awayTeam: 'Monaco', result: '2-0' },
//   { homeTeam: 'Borussia Dortmund', awayTeam: 'Club Brugge', result: '0-0' },
//   { homeTeam: 'Club Brugge', awayTeam: 'Atletico Madrid', result: '0-0' },
//   { homeTeam: 'Monaco', awayTeam: 'Borussia Dortmund', result: '0-2' },
// ];
 
// var table = calcTable(data)
// for (var i = 0; i < table.length; i++) {
//     var row = table[i];
//     console.log(`${row.teamName} | ${row.played} | ${row.wins} | ${row.draws} | ${row.losts} | ${row.goalsFor} | ${row.goalsAgainst} | ${row.goalsDiff} | ${row.points}`);
// }

// Visszatérési érték:
// * nincs benne az elválasztó -> undefined
// * van benne elválasztó -> { leftPart: "bal oldali rész", rightPart: "jobb oldali rész" }
function separateStr(inputStr, separatorChar, fromLeft) {
  var separatorIndex = fromLeft ?
      inputStr.indexOf(separatorChar) :
      inputStr.lastIndexOf(separatorChar);

  if (separatorIndex < 0)
      return;

  return {
      leftPart: inputStr.substr(0, separatorIndex),
      rightPart: inputStr.substr(separatorIndex + 1)
  }
}

// "Club Brugge-Borussia Dortmund 0:1"
// ->
// { homeTeam: "Club Brugge", awayTeam: "Borussia Dortmund", homeGoals: 0, awayGoals: 1 }
function parseMatch(input) {
  var matchParts = separateStr(input, " ", false);
  if (typeof matchParts === 'undefined')
      return;

  var resultParts = separateStr(matchParts.rightPart, ":", true);
  if (typeof resultParts === 'undefined')
      return;

  var homeGoals = parseInt(resultParts.leftPart);
  var awayGoals = parseInt(resultParts.rightPart);

  if (isNaN(homeGoals) || isNaN(awayGoals))
      return;

  var teamParts = separateStr(matchParts.leftPart, "-", true);
  if (typeof teamParts === 'undefined')
      return;

  if (teamParts.leftPart.length === 0 || teamParts.rightPart.length === 0)
      return;

  return { 
      homeTeam: teamParts.leftPart, 
      awayTeam:  teamParts.rightPart, 
      homeGoals: homeGoals, 
      awayGoals: awayGoals
  };
}

// visszatérési érték:
// [
//   { homeTeam: 'Club Brugge', awayTeam: 'Borussia Dortmund', homeGoals: 0, awayGoals: 1 },
//   { homeTeam: 'Monaco', awayTeam: 'Atletico Madrid', homeGoals: 1, awayGoals: 2 },
// ]
function parseMatches(value)
{
  var result = [];

  var lines = value.split("\n");
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i].trim();
    
    if (line.length === 0)
      continue;

    var match = parseMatch(line);
    if (typeof match === "undefined")
    {
      alert('A(z) ' + (i + 1) + ". meccs hibás!");
      return;
    }

    result.push(match);
  }

  return result;
}

function loadTable() {
  var inputText = document.getElementById('inputText').value;
  
  var matches = parseMatches(inputText);
  if (typeof matches === 'undefined')
    return;

  var table = calcTable(matches);

  console.log(table);
}