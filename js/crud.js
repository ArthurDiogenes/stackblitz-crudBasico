import { getUsers, saveUsers } from './storage.js';

export function createUser(name, email) {
  const users = getUsers();
  const newUser = {
    id: Date.now(),
    name,
    email
  }

  users.push(newUser);
  saveUsers(users);
}

export function listUsers(callbackRender) {
  const users = getUsers();
  callbackRender(users);
}

export function updateUser(id, newName, newEmail) {
  const users = getUsers();
  const user = users.find(u => u.id === id);

  if(user) {
    user.name = newName;
    user.email = newEmail;
    saveUsers(users);
  }
}

export function deleteUser(id) {
  let users = getUsers();
  users = users.filter(u => u.id !== id);
  saveUsers(users);
}