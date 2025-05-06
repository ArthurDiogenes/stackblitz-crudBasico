export function getUsers() {
  const data = localStorage.getItem('users');
  return data ? JSON.parse(data) : [];
}

export function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}