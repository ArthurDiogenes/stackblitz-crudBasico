import { createUser, listUsers, updateUser, deleteUser } from 'crud.js';
import { getUsers, saveUsers } from 'storage.js';

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
  
}

function resetHTML() {
  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
}
