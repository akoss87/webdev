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

function displayTable(table) {
    var tableContainer = document.getElementById("table-container");
    tableContainer.innerHTML = "";

    var tableElement = document.createElement("table");

    // táblázat header
    var tableHead = document.createElement("thead");

    var tableRow = document.createElement("tr");

    var cellTexts = ["#", "Team Name", "P", "W", "D", "L", "F", "A", "GD", "Pts"];
    for (var i = 0; i < cellTexts.length; i++) {
        var tableCell = document.createElement("th");
        tableCell.innerText = cellTexts[i];
        tableRow.appendChild(tableCell);
    }

    tableHead.appendChild(tableRow);

    tableElement.appendChild(tableHead);

    // táblázat tartalom
    var tableBody = document.createElement("tbody");

    for (var i = 0; i < table.length; i++) {
        tableRow = document.createElement("tr");

        var teamStat = table[i];
        var cellTexts = [i + 1, teamStat.teamName, teamStat.played, teamStat.wins, teamStat.draws, teamStat.losts, teamStat.goalsFor, teamStat.goalsAgainst, teamStat.goalsDiff, teamStat.points];

        for (var j = 0; j < cellTexts.length; j++) {
            var tableCell = document.createElement("td");
            tableCell.innerText = cellTexts[j];
            tableRow.appendChild(tableCell);
        }
            
        tableBody.appendChild(tableRow);
    }

    tableElement.appendChild(tableBody);

    // A táblázatot a memóriában építjük, és csak a legvégén adjuk hozzá a DOM-hoz.
    tableContainer.appendChild(tableElement);
}

function loadTable() {
    var inputText = document.getElementById('input-text').value;

    var matches = parseMatches(inputText);
    if (typeof matches === 'undefined')
        return;

    var table = calcTable(matches);

    displayTable(table);
}
