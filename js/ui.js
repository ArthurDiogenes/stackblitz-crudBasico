import { createUser, listUsers, updateUser, deleteUser } from './crud.js';

let eventListenerAttached = false;

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
    if (users.length === 0) {
      const emptyMessage = document.createElement('li');
      emptyMessage.className = 'empty-state';
      emptyMessage.textContent = 'Nenhum usuário cadastrado';
      list.appendChild(emptyMessage);
      return;
    }

    users.forEach(user => {
      const li = document.createElement('li');
      
      const userInfo = document.createElement('div');
      userInfo.className = 'user-info';
      
      const userName = document.createElement('span');
      userName.className = 'user-name';
      userName.textContent = user.name;
      
      const userEmail = document.createElement('span');
      userEmail.className = 'user-email';
      userEmail.textContent = user.email;
      
      userInfo.appendChild(userName);
      userInfo.appendChild(userEmail);
      
      const actions = document.createElement('div');
      actions.className = 'actions';
      
      const editBtn = document.createElement('button');
      editBtn.className = 'edit-btn';
      editBtn.textContent = 'Editar';
      editBtn.dataset.id = user.id;
      
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'delete-btn';
      deleteBtn.textContent = 'Deletar';
      deleteBtn.dataset.id = user.id;
      
      actions.appendChild(editBtn);
      actions.appendChild(deleteBtn);
      
      li.appendChild(userInfo);
      li.appendChild(actions);
      
      list.appendChild(li);
    });
  });
  
  addButtonListeners();
}

function addButtonListeners() {
  const listaUsuarios = document.getElementById('listaUsuarios');
  if (eventListenerAttached) {
    listaUsuarios.removeEventListener('click', handleButtonClick);
  }
  
  listaUsuarios.addEventListener('click', handleButtonClick);
  eventListenerAttached = true;
}

function handleButtonClick(e) {
  if (e.target.classList.contains('edit-btn')) {
    const id = parseInt(e.target.getAttribute('data-id'));
    editUser(id);
  } else if (e.target.classList.contains('delete-btn')) {
    const id = parseInt(e.target.getAttribute('data-id'));
    removeUser(id);
  }
}

function editUser(id) {
  const newName = prompt('Novo nome:');
  if (newName === null) return;
  
  const newEmail = prompt('Novo email:');
  if (newEmail === null) return;

  if (newName.trim() && newEmail.trim()) {
    updateUser(id, newName, newEmail);
    renderList();
    showSuccess('Usuário atualizado com sucesso!');
  } else {
    showError('Preencha todos os campos.');
  }
}

function removeUser(id) {
  if (confirm('Tem certeza que deseja deletar?')) {
    deleteUser(id);
    renderList();
    showSuccess('Usuário removido com sucesso!');
  }
}

function showSuccess(message) {
  const successDiv = document.createElement('div');
  successDiv.className = 'toast success';
  successDiv.textContent = message;
  
  document.body.appendChild(successDiv);
  
  setTimeout(() => {
    successDiv.classList.add('show');
  }, 10);
  
  setTimeout(() => {
    successDiv.classList.remove('show');
    setTimeout(() => {
      successDiv.remove();
    }, 300);
  }, 3000);
}

function resetHTML() {
  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
}