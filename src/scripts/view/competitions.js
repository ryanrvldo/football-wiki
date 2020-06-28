import "../component/competition-list.js"
import DataSource from '../data/data-source.js';

document.addEventListener("DOMContentLoaded", () => {
    const competitionList = document.querySelector("competition-list");

    DataSource.getCompetitions()
        .then(competitions => {
            competitionList.competitions = competitions;
            document.querySelector("app-bar").togglePreloader();
        })
        .catch(msg => {
            console.error(msg);
        });
});