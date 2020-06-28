import './styles/main.scss';
import './assets/img/undraw_goal.svg';
import './scripts/component/app-bar.js';

const menu = [
    {
        title: 'Home',
        link: './index.html',
        icon: 'fas fa-home',
    },
    {
        title: 'Competitions',
        link: './competitions.html',
        icon: 'fas fa-trophy',
    },
    {
        title: 'Teams',
        link: './teams.html',
        icon: 'fas fa-futbol',
    },
    {
        title: 'Standings',
        link: './standings.html',
        icon: 'fas fa-chart-line',
    },
    {
        title: 'Favorite',
        link: './favorite-teams.html',
        icon: 'fab fa-gratipay',
    },
];

document.addEventListener('DOMContentLoaded', () => {
    const sideNavs = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sideNavs);

    const page = window.location.pathname.substr(1);
    const menuItem = item => {
        return `
        <li class="${page === item.link.substr(2) || (page === '' && item.title === 'Home') ? `active` : ``}">
            <a href="${item.link}" class="waves-effect waves-light">
                <i class="${item.icon} fa-2x hide-on-large-only"></i>${item.title}
            </a>
        </li>`;
    };

    console.log(page);

    document.querySelectorAll('.topnav, .sidenav').forEach(navbar => {
        navbar.innerHTML = /* html */ `
            <div class="hide-on-large-only">
                <div class="user-view">
                    <div style="height: 180px;">
                        <img src="./assets/img/undraw_goal.svg" alt="Banner" class="responsive-img">
                    </div>
                </div>
            </div>
            ${menu.map(item => menuItem(item)).join('')}
        `;
    });

    const navItem = document.querySelectorAll('ul.topnav li, ul.sidenav li');
    navItem.forEach(item => {
        item.addEventListener('click', () => {
            M.Sidenav.getInstance(document.querySelector('.sidenav')).close();
        });
    });
});
