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
    awayTeam: teamParts.rightPart,
    homeGoals: homeGoals,
    awayGoals: awayGoals
  };
}

// visszatérési érték:
// [
//   { homeTeam: 'Club Brugge', awayTeam: 'Borussia Dortmund', homeGoals: 0, awayGoals: 1 },
//   { homeTeam: 'Monaco', awayTeam: 'Atletico Madrid', homeGoals: 1, awayGoals: 2 },
// ]
function parseMatches(value) {
  var result = [];

  var lines = value.split("\n");
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i].trim();

    if (line.length === 0)
      continue;

    var match = parseMatch(line);
    if (typeof match === "undefined") {
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
