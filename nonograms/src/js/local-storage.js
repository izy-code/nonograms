const LOCAL_STORAGE_KEY = 'izyNonogram';

const isLocalStorageObjectExist = () =>
  localStorage.hasOwnProperty(LOCAL_STORAGE_KEY);

const getLocalStorageObject = () => JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

const setLocalStorageObject = (object) =>
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(object));

const getLocalStorageObjectProperty = (key) => {
  if (!isLocalStorageObjectExist()) {
    return null;
  }

  const localStorageObject = getLocalStorageObject();

  return localStorageObject[key];
};

const setLocalStorageObjectProperty = (key, value) => {
  let localStorageObject = {};

  if (isLocalStorageObjectExist()) localStorageObject = getLocalStorageObject();

  localStorageObject[key] = value;
  setLocalStorageObject(localStorageObject);
};

export { getLocalStorageObjectProperty, setLocalStorageObjectProperty };
