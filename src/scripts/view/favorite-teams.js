import '../../assets/img/undraw_page_not_found.svg';
import '../component/club-list.js';
import { getFavTeams } from '../data/db.js';

document.addEventListener('DOMContentLoaded', () => {
  const appBar = document.querySelector('app-bar');
  const teamList = document.querySelector('club-list');
  const listStatus = document.getElementById('list-status');

  getFavTeams()
    .then(teams => {
      if (teams.length === 0) {
        listStatus.innerHTML = /* html */ `Opps sorry your favorite list still empty. Go search your favorite teams, and mark them as your favorite team <a href="./teams.html" class="blue-text">here.</a>`;
      } else {
        listStatus.innerHTML = 'Here are your favorite teams.';
        teamList.clubs = teams;
      }
      appBar.togglePreloader();
    })
    .catch(error => {
      console.log(error);
    });
});
