import DataSource from '../data/data-source.js';
import { addFavoriteTeam, getFavTeamById, deleteFavTeam } from '../data/db.js';
import HeartSolidIcon from '../../assets/icon/heart-solid.svg';
import HeartRegularIcon from '../../assets/icon/heart-regular.svg';
import PNFIcon from '../../assets/img/undraw_page_not_found.svg';

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const idParam = urlParams.get('id');

  const favIcon = document.getElementById('fav-icon');
  let isFavorited = false;

  const teamObject = DataSource.getTeamDetail(idParam)
    .then(team => {
      renderInfo(team);
      getFavTeamById(team.id).then(club => {
        if (club !== undefined) {
          isFavorited = true;
          document.title = `${team.name} | WikiFootball`;
          favIcon.src = HeartSolidIcon;
        }
      });
      return Promise.resolve(team);
    })
    .catch(msg => {
      console.error(msg);
    });

  const btnFav = document.querySelector('.fixed-action-btn');
  M.FloatingActionButton.init(btnFav, {
    hoverEnabled: false,
  });

  btnFav.addEventListener('click', () => {
    teamObject.then(team => {
      if (isFavorited) {
        deleteFavTeam(team.id);
        isFavorited = false;
        M.toast({
          html: 'Removed from favorite list.',
          classes: 'light-red darken-2',
        });
        favIcon.src = HeartRegularIcon;
      } else {
        addFavoriteTeam(team);
        isFavorited = true;
        M.toast({
          html: 'Added to favorite list.',
          classes: 'light-blue darken-2',
        });
        favIcon.src = HeartSolidIcon;
      }
    });
  });
});

function renderInfo(team) {
  document.querySelector('h3#name').innerHTML = team.name;
  document.querySelector('p#venue').innerHTML = team.venue;
  document.querySelector('p#address').innerHTML = team.address;
  document.querySelector('a#website').innerHTML = team.website;
  document.querySelector('a#website').href = team.website;
  const teamLogo = document.querySelector('img#logo');
  teamLogo.src = team.crestUrl;
  teamLogo.onerror = function () {
    this.onerror = null;
    this.src = PNFIcon;
  };

  const tableElement = document.getElementById('squads-table');
  tableElement.innerHTML = /* html */ `
        <h5>Squad</h5>
        <table class="centered highlight responsive-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Nationality</th>
                    <th>Role</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    `;
  let i = 1;
  team.squad.forEach(squad => {
    tableElement.querySelector('tbody').innerHTML += /* html */ `
            <tr class="hoverable">
                <td>${i}</td>
                <td>${squad.name}</td>
                <td>${squad.position}</td>
                <td>${squad.nationality}</td>
                <td>${squad.role}</td>
            </tr>
        `;
    i++;
  });

  document.querySelector('app-bar').togglePreloader();
}
