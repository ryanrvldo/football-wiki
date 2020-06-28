import "../../assets/img/undraw_page_not_found.svg";
import "../component/club-list.js";
import {
    getFavTeams,
} from "../data/db.js";

document.addEventListener("DOMContentLoaded", () => {
    const appBar = document.querySelector("app-bar");
    const teamList = document.querySelector("club-list");

    getFavTeams()
        .then(teams => {
            teamList.clubs = teams;
            appBar.togglePreloader();
        })
        .catch(error => {
            console.log(error);
        })
})