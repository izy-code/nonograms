const LOCAL_STORAGE_KEY = 'izyNonogram';
const WINS_LIST_LENGTH = 5;

const isLocalStorageObjectExist = () =>
  localStorage.hasOwnProperty(LOCAL_STORAGE_KEY);

const getLocalStorageObject = () =>
  JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

const setLocalStorageObject = (object) =>
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(object));

const getLocalStorageProperty = (key) => {
  if (!isLocalStorageObjectExist()) {
    return null;
  }

  const localStorageObject = getLocalStorageObject();

  if (localStorageObject[key] === undefined) {
    return null;
  }

  return localStorageObject[key];
};

const setLocalStorageProperty = (key, value) => {
  let localStorageObject = {};

  if (isLocalStorageObjectExist()) localStorageObject = getLocalStorageObject();

  localStorageObject[key] = value;
  setLocalStorageObject(localStorageObject);
};

const addWin = (size, name, time, formattedTime) => {
  let wins = getLocalStorageProperty('wins');

  if (wins === null) wins = [];

  if (wins.length >= WINS_LIST_LENGTH) {
    wins.shift();
  }

  wins.push({ size, name, time, formattedTime });
  setLocalStorageProperty('wins', wins);
};

const getWins = () => getLocalStorageProperty('wins');

export { getLocalStorageProperty, setLocalStorageProperty, addWin, getWins };
