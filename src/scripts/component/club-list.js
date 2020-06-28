import "../component/club-item.js";

class ClubList extends HTMLElement {
    set clubs(clubs) {
        this._clubs = clubs;
        this.render();
    }

    render() {
        this.innerHTML = /* html */ `<div class="row" id="teams"></div>`
        const clubList = this.querySelector("div#teams");

        this._clubs.forEach(club => {
            const itemElement = document.createElement("club-item");
            itemElement.club = club;
            clubList.appendChild(itemElement);
        });
    }

    renderError(msg) {
        this.innerHTML += /* html */ `<h5>Error: ${msg}</h5>`;
    }
}

customElements.define("club-list", ClubList);