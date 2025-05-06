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
      ${user.name} (${user.email}) <button onclick="edit(${user.id})">Editar</button> <button onclick="delete(${user.id})">Deletar</button>
      `;
      list.appendChild(li);
    })
  })
}

function resetHTML() {
  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
}

window.edit = (id) => {
  const newName = prompt('Novo nome:');
  const newEmail = prompt('Novo email:');

  if (newName && newEmail) {
    updateUser(id, newName, newEmail);
    renderList();
  } else {
    alert('Preencha todos os campos.');
  }
}

window.delete = (id) => {
  if (confirm('Tem certeza que deseja deletar?')) {
    deleteUser(id);
    renderList();
  }
}