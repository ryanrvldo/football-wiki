import "../../assets/img/undraw_page_not_found.svg";
import "../component/club-list.js";
import DataSource from "../data/data-source.js";

document.addEventListener("DOMContentLoaded", () => {
    const optionTeams = document.querySelector("select");
    const appBar = document.querySelector("app-bar");

    DataSource.getCompetitions()
        .then(competitions => {
            competitions.forEach(competition => {
                const optionElement = document.createElement("option")
                optionElement.value = competition.code;
                optionElement.innerHTML = competition.name;

                optionTeams.appendChild(optionElement);
            });
            M.FormSelect.init(optionTeams);
            appBar.togglePreloader();
        })
        .catch(msg => {
            console.error(msg);
        });

    document.getElementById("team-select").addEventListener("change", (event) => {
        appBar.togglePreloader();
        const clubListElem = document.querySelector("club-list");

        DataSource.getCompetitionTeams(event.target.value)
            .then(teams => {
                clubListElem.clubs = teams;
                appBar.togglePreloader();
            })
            .catch(msg => {
                console.error(msg);
            });;

    });
});