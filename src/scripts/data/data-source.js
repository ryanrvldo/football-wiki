const base_url = 'https://api.football-data.org/v2/';
const api_token = '26d1d3867a464ed7ab5ac2c695c8d979';
const options = {
  headers: {
    'X-Auth-Token': api_token,
  },
};

function getStatus(response) {
  if (response.status === 200) {
    return Promise.resolve(response);
  } else {
    showError(response.status);
    return Promise.reject(new Error(response.statusText));
  }
}

function toJson(response) {
  return response.json();
}

function showError(error) {
  console.log('Error: ' + error);
  return Promise.reject(error);
}

class DataSource {
  static fetchCompetitions() {
    return fetch(`${base_url}competitions?plan=TIER_ONE`, options).then(getStatus).then(toJson);
  }

  static getCompetitions() {
    if ('caches' in window) {
      return caches
        .match(`${base_url}competitions?plan=TIER_ONE`)
        .then(response => {
          if (response) return response.json();
          return this.fetchCompetitions();
        })
        .then(data => {
          return Promise.resolve(data.competitions);
        })
        .catch(showError);
    } else {
      return this.fetchCompetitions();
    }
  }

  static fetchTeams(code) {
    return fetch(`${base_url}competitions/${code}/teams`, options).then(getStatus).then(toJson);
  }

  static getCompetitionTeams(code) {
    if ('caches' in window) {
      return caches
        .match(`${base_url}competitions/${code}/teams`)
        .then(response => {
          if (response) return response.json();
          return this.fetchTeams(code);
        })
        .then(data => {
          return Promise.resolve(data.teams);
        })
        .catch(showError);
    } else {
      return this.fetchTeams(code);
    }
  }

  static fetchStandings(code) {
    return fetch(`${base_url}competitions/${code}/standings?standingType=TOTAL`, options)
      .then(getStatus)
      .then(toJson);
  }

  static getCompetitionStandings(code) {
    if ('caches' in window) {
      return caches
        .match(`${base_url}competitions/${code}/standings?standingType=TOTAL`)
        .then(response => {
          if (response) return response.json();
          return this.fetchStandings(code);
        })
        .then(data => {
          return Promise.resolve(data);
        })
        .catch(showError);
    } else {
      return this.fetchStandings(code);
    }
  }

  static fetchTeamDetail(id) {
    return fetch(`${base_url}teams/${id}`, options).then(getStatus).then(toJson);
  }

  static getTeamDetail(id) {
    if ('caches' in window) {
      return caches
        .match(`${base_url}teams/${id}`)
        .then(response => {
          if (response) return response.json();
          return this.fetchTeamDetail(id);
        })
        .then(data => {
          return Promise.resolve(data);
        })
        .catch(showError);
    } else {
      return this.fetchTeamDetail(id);
    }
  }
}
export default DataSource;
