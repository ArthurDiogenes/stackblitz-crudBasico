import { createUser, listUsers, updateUser, deleteUser } from './crud.js';

export function setupUI() {
  document.getElementById('btn').addEventListener('click', () => {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();

    if (!name || !email) {
      showError('Preencha todos os campos.');
      return;
    }

    createUser(name, email);
    renderList();
    resetHTML();
  });
  renderList();
}

function showError(message) {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error';
  errorDiv.textContent = message;
  
  document.body.insertBefore(errorDiv, document.body.firstChild);
  
  setTimeout(() => {
    errorDiv.remove();
  }, 3000);
}

function renderList() {
  const list = document.getElementById('listaUsuarios');
  list.innerHTML = '';

  listUsers(users => {
    users.forEach(user => {
      const li = document.createElement('li');
      li.innerHTML = `
      ${user.name} (${user.email}) 
      <button data-id="${user.id}" class="edit-btn">Editar</button> 
      <button data-id="${user.id}" class="delete-btn">Deletar</button>
      `;
      list.appendChild(li);
    });
  });
  
  addButtonListeners();
}

function addButtonListeners() {
  document.getElementById('listaUsuarios').addEventListener('click', (e) => {
    if (e.target.classList.contains('edit-btn')) {
      const id = parseInt(e.target.getAttribute('data-id'));
      editUser(id);
    } else if (e.target.classList.contains('delete-btn')) {
      const id = parseInt(e.target.getAttribute('data-id'));
      removeUser(id);
    }
  });
}

function editUser(id) {
  const newName = prompt('Novo nome:');
  const newEmail = prompt('Novo email:');

  if (newName && newEmail) {
    updateUser(id, newName, newEmail);
    renderList();
  } else {
    showError('Preencha todos os campos.');
  }
}

function removeUser(id) {
  if (confirm('Tem certeza que deseja deletar?')) {
    deleteUser(id);
    renderList();
  }
}

function resetHTML() {
  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
}