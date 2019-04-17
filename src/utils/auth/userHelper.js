import { getItem, setItem, removeItem } from '../localStoreHelper';

export function getUser() {
  const user = getItem('user');
  return JSON.parse(user);
}

export function setUser(user) {
  return setItem('user', JSON.stringify(user));
}

export function deleteUser() {
  return removeItem('user');
}