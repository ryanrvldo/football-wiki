import BarsIcon from '../../assets/icon/bars.svg';

class AppBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = /* html */ `
        <div class="navbar-fixed">
					<nav class="light-blue darken-2" role="navigation">
						<div class="nav-wrapper">
							<div class="container">
								<a href="./index.html" class="brand-logo" id="logo-container">WikiFootball</a>
								<ul class="topnav right hide-on-med-and-down"></ul>
								<a href="#" class="sidenav-trigger" data-target="nav-mobile">
									<img src="${BarsIcon}" alt="Bars Icon" class="responsive-img">
								</a>
							</div>
							<div class="progress light-blue accent-1">
								<div class="indeterminate"></div>
							</div>
						</div>
					</nav>
        </div>
        <ul id="nav-mobile" class="sidenav"></ul>
    `;
  }

  togglePreloader() {
    const preloader = this.querySelector('div.progress');
    preloader.classList.toggle('hide');
  }
}

customElements.define('app-bar', AppBar);
