import { createUser, listUsers, updateUser, deleteUser } from 'crud.js';

export function setupUI() {
  document.getElementById('btn').addEventListener('click', () => {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();

    if (!name || !email) {
      //SUBSTITUIR ESSE ALERT POR UMA MENSAGEM DE ERRO DENTRO DA PAGINA
      alert('Preencha todos os campos.');
      return;
    }

    createUser(name, email);
    renderList();
    resetHTML();
  });
  renderList();
}

function renderList() {
  const list = document.getElementById('listUsers');
  list.innerHTML = '';

  listUsers(users => {
    users.forEach(user => {
      const li = document.createElement('li');
      li.innerHTML = `
      ${user.name} (${user.email}) <button onclick="editar(${user.id})">Editar</button> <button onclick="deletar(${user.id})">Deletar</button>
      `;
      list.appendChild(li);
    })
  })
}

function resetHTML() {
  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
}
