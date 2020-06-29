import idb from './idb.js';

const dbPromised = idb.open('wiki-football', 1, upgradeDb => {
  const teamsObjectStore = upgradeDb.createObjectStore('teams', {
    keyPath: 'id',
  });
  teamsObjectStore.createIndex('team_name', 'team_name', {
    unique: false,
  });
});

const addFavoriteTeam = team => {
  dbPromised.then(db => {
    const tx = db.transaction('teams', 'readwrite');
    const store = tx.objectStore('teams');
    store.add(team);
    return tx.complete;
  });
};

const getFavTeams = () => {
  return new Promise((resolve, reject) => {
    dbPromised
      .then(db => {
        const tx = db.transaction('teams', 'readonly');
        const store = tx.objectStore('teams');
        return store.getAll();
      })
      .then(teams => {
        resolve(teams);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const getFavTeamById = id => {
  return new Promise((resolve, reject) => {
    dbPromised
      .then(db => {
        const tx = db.transaction('teams', 'readonly');
        const store = tx.objectStore('teams');
        return store.get(id);
      })
      .then(team => {
        resolve(team);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const deleteFavTeam = id => {
  dbPromised
    .then(db => {
      const tx = db.transaction('teams', 'readwrite');
      const store = tx.objectStore('teams');
      store.delete(id);
      return tx.complete;
    })
    .catch(error => {
      console.log(error);
    });
};
export { addFavoriteTeam, getFavTeams, getFavTeamById, deleteFavTeam };
