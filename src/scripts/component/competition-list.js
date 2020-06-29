import '../component/competition-item.js';

class CompetitionList extends HTMLElement {
  set competitions(competitions) {
    this._competitions = competitions;
    this.render();
  }

  render() {
    this.innerHTML = /* html */ `<div class="row section" id="competitions"></div>`;
    const competitionList = this.querySelector('div#competitions');

    this._competitions.forEach(competition => {
      const itemElement = document.createElement('competition-item');
      itemElement.competition = competition;
      competitionList.appendChild(itemElement);
    });
  }

  renderError(message) {
    this.innerHTML += /* html */ `<h5>Error: ${message}</h5>`;
  }
}

customElements.define('competition-list', CompetitionList);
