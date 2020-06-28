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
}

class DataSource {
    static getCompetitions() {
        if ('caches' in window) {
            caches
                .match(`${base_url}competitions?plan=TIER_ONE`)
                .then(getStatus)
                .then(toJson)
                .then(response => {
                    if (response.competitions) {
                        return Promise.resolve(response.competitions);
                    } else {
                        return Promise.reject('getCompetitions:  failed response.');
                    }
                })
                .catch(showError);
        }

        return fetch(`${base_url}competitions?plan=TIER_ONE`, options)
            .then(getStatus)
            .then(toJson)
            .then(response => {
                if (response.competitions) {
                    return Promise.resolve(response.competitions);
                } else {
                    return Promise.reject('getCompetitions:  failed response.');
                }
            })
            .catch(showError);
    }

    static getCompetitionTeams(code) {
        if ('caches' in window) {
            caches
                .match(`${base_url}competitions/${code}/teams`)
                .then(getStatus)
                .then(toJson)
                .then(response => {
                    if (response.teams) {
                        return Promise.resolve(response.teams);
                    } else {
                        return Promise.reject('getCompetitionTeams: failed response.');
                    }
                })
                .catch(showError);
        }

        return fetch(`${base_url}competitions/${code}/teams`, options)
            .then(getStatus)
            .then(toJson)
            .then(response => {
                if (response.teams) {
                    return Promise.resolve(response.teams);
                } else {
                    return Promise.reject('getCompetitionTeams: failed response.');
                }
            })
            .catch(showError);
    }

    static getCompetitionStandings(code) {
        if ('caches' in window) {
            caches
                .match(`${base_url}competitions/${code}/standings?standingType=TOTAL`)
                .then(getStatus)
                .then(toJson)
                .then(response => {
                    if (response) {
                        return Promise.resolve(response);
                    } else {
                        return Promise.reject('getCompetitionStandings: failed response.');
                    }
                })
                .catch(showError);
        }

        return fetch(`${base_url}competitions/${code}/standings?standingType=TOTAL`, options)
            .then(getStatus)
            .then(toJson)
            .then(response => {
                if (response) {
                    return Promise.resolve(response);
                } else {
                    return Promise.reject('getCompetitionStandings: failed response.');
                }
            })
            .catch(showError);
    }

    static getTeamDetail(id) {
        if ('caches' in window) {
            caches
                .match(`${base_url}teams/${id}`)
                .then(getStatus)
                .then(toJson)
                .then(response => {
                    if (response) {
                        return Promise.resolve(response);
                    } else {
                        return Promise.reject('getTeamDetail: failed response.');
                    }
                })
                .catch(showError);
        }

        return fetch(`${base_url}teams/${id}`, options)
            .then(getStatus)
            .then(toJson)
            .then(response => {
                if (response) {
                    return Promise.resolve(response);
                } else {
                    return Promise.reject('getTeamDetail: failed response.');
                }
            })
            .catch(showError);
    }
}
export default DataSource;
