const LOCAL_STORAGE_KEY = 'izyNonogram';

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

export { getLocalStorageProperty, setLocalStorageProperty };
