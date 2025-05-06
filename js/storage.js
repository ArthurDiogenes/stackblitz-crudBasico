export function getUsers() {
  const data = localStorage.getItem('users');
  return data ? JSON.parse(data) : [];
}

export function saveUsers(users) {
  localStorage.getItem('users', JSON.stringify(users));
}