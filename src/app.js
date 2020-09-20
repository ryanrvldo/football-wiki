import 'regenerator-runtime';
import './styles/main.scss';
import './scripts/component/app-bar.js';
import BannerNav from './assets/img/undraw_goal.svg';
import HomeIcon from './assets/icon/home.svg';
import TrophyIcon from './assets/icon/trophy.svg';
import FutbolIcon from './assets/icon/futbol.svg';
import ChartLineIcon from './assets/icon/chart-line.svg';
import GratipayIcon from './assets/icon/gratipay.svg';
import './assets/icon/apple-touch-icon-192x192.png';

const menu = [
  {
    title: 'Home',
    link: './index.html',
    icon: HomeIcon,
  },
  {
    title: 'Competitions',
    link: './competitions.html',
    icon: TrophyIcon,
  },
  {
    title: 'Teams',
    link: './teams.html',
    icon: FutbolIcon,
  },
  {
    title: 'Standings',
    link: './standings.html',
    icon: ChartLineIcon,
  },
  {
    title: 'Favorite',
    link: './favorite-teams.html',
    icon: GratipayIcon,
  },
];

document.addEventListener('DOMContentLoaded', () => {
  const sideNavs = document.querySelectorAll('.sidenav');
  M.Sidenav.init(sideNavs);

  const page = window.location.pathname.substr(1);
  const menuItem = item => {
    return /* html */ `
			<li class="${page === item.link.substr(2) || (page === '' && item.title === 'Home') ? `active` : ``}">
				<a href="${page === item.link.substr(2) ? '#' : `${item.link}`}" class="waves-effect waves-light">
						<div class="valign-wrapper">
								<img src="${item.icon}" alt="Icon" class="icon hide-on-large-only"/>
								<span>${item.title}</span>
						</div>
				</a>
			</li>`;
  };

  document.querySelectorAll('.topnav, .sidenav').forEach(navbar => {
    navbar.innerHTML = /* html */ `
            <div class="hide-on-large-only">
                <div class="user-view">
                    <div style="height: 180px;">
                        <img src="${BannerNav}" alt="Banner" class="responsive-img">
                    </div>
                </div>
            </div>
            ${menu.map(item => menuItem(item)).join('')}
        `;

  const navItem = document.querySelectorAll('ul.topnav li, ul.sidenav li');
  navItem.forEach(item => {
    item.addEventListener('click', () => {
      M.Sidenav.getInstance(document.querySelector('.sidenav')).close();
    });
  });
});
