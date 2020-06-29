class CompetitionItem extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  set competition(competition) {
    this._competition = competition;
    this.render();
  }

  render() {
    this.innerHTML = /* html */ `
			<div class="col s12 m12 l6 xl4">
				<div class="card small hoverable cyan lighten-5">
					<div class="card-content">
						<span class="card-title">${this._competition.name}</span>
						<blockquote>
							<p>${this._competition.area.name}</p>
							<p class="light">End season: ${new Date(this._competition.currentSeason.endDate).toDateString()}</p>
						</blockquote>
					</div>
				</div>
			</div>
		`;
  }
}

customElements.define('competition-item', CompetitionItem);
