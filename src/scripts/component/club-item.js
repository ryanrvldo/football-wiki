class ClubItem extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    set club(club) {
        this._club = club;
        this.render();
    }

    render() {
        this.innerHTML = /* html */ `
            <div class="col s12 m6 l4 xl3">
                <div class="card hoverable medium z-depth-2">
                    <div class="card-image">
                        <img class="club" src="${this._club.crestUrl}" onerror="this.onerror=null;this.src='./src/assets/img/undraw_page_not_found.svg';" alt="">
                    </div>
                    <a href="./team.html?id=${this._club.id}">
                        <div class="card-content">
                            <span class="card-title strong center-align black-text">${this._club.name}</span>
                        </div>
                    </a>
                </div>
            </div>
        `;
    }
}

customElements.define("club-item", ClubItem);