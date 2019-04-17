const ifStorageExists = typeof(Storage) !== "undefined";

export function setItem(key, value) {
  return (ifStorageExists && localStorage.setItem(key, value)) || null;
}

export function getItem(key) {
  return (ifStorageExists && localStorage.getItem(key)) || null;
}

export function removeItem(key) {
  return (ifStorageExists && localStorage.removeItem(key)) || null;
}