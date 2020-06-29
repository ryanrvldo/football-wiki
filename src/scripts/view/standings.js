import DataSource from '../data/data-source.js';
import PNFIcon from '../../assets/img/undraw_page_not_found.svg';

document.addEventListener('DOMContentLoaded', () => {
  const optionTeams = document.querySelector('select');
  const appBar = document.querySelector('app-bar');

  DataSource.getCompetitions()
    .then(competitions => {
      competitions.forEach(competition => {
        const optionElement = document.createElement('option');
        optionElement.value = competition.code;
        optionElement.innerHTML = competition.name;

        optionTeams.appendChild(optionElement);
      });
      M.FormSelect.init(optionTeams);
      appBar.togglePreloader();
    })
    .catch(msg => {
      console.log(msg);
    });

  document.getElementById('standings-select').addEventListener('change', event => {
    appBar.togglePreloader();
    DataSource.getCompetitionStandings(event.target.value)
      .then(response => {
        renderTable(response.standings[0].table);
        appBar.togglePreloader();
      })
      .catch(msg => {
        console.log(msg);
      });
  });

  function renderTable(standings) {
    const tableElement = document.getElementById('standings-table');
    tableElement.innerHTML = /* html */ `
            <thead>
                <tr>
                    <th>Position</th>
                    <th>Club</th>
                    <th>Played</th>
                    <th>Won</th>
                    <th>Drawn</th>
                    <th>Lost</th>
                    <th>GF</th>
                    <th>GA</th>
                    <th>GD</th>
                    <th>Points</th>
                </tr>
            </thead>
            <tbody></tbody>
        `;
    standings.forEach(club => {
      tableElement.querySelector('tbody').innerHTML += /* html */ `
                <tr class="hoverable">
                    <td>${club.position}</td>
                    <td>
                        <div class="valign-wrapper">
                            <img style="width: 30px; height:30px;" src="${club.team.crestUrl}" onerror="this.onerror=null;this.src='${PNFIcon}';" alt="">
                            <a href="./team.html?id=${club.team.id}">${club.team.name}</a>
                        </div>
                    </td>
                    <td>${club.playedGames}</td>
                    <td>${club.won}</td>
                    <td>${club.draw}</td>
                    <td>${club.lost}</td>
                    <td>${club.goalsFor}</td>
                    <td>${club.goalsAgainst}</td>
                    <td>${club.goalDifference}</td>
                    <td>${club.points}</td>
                </tr>
            `;
    });
  }
});
