const uri = 'api/TodoItems';
let todos = [];

function getItems() {
  fetch(uri)
    .then(response => response.json())
    .then(data => displayItems(data))
    .catch(error => console.error('Unable to get items.', error));
}

function addItem() {
  const addNameTextbox = document.getElementById('add-name');

  const item = {
    isComplete: false,
    name: addNameTextbox.value.trim()
  };

  fetch(uri, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  })
    .then(response => response.json())
    .then(() => {
      getItems();
      addNameTextbox.value = '';
    })
    .catch(error => console.error('Unable to add item.', error));
}

function deleteItem(id) {
  fetch(`${uri}/${id}`, { method: 'DELETE' })
    .then(() => getItems())
    .catch(error => console.error('Unable to delete item.', error));
}

function displayEditForm(id) {
  const item = todos.find(item => item.id === id);

  document.getElementById('edit-name').value = item.name;
  document.getElementById('edit-id').value = item.id;
  document.getElementById('edit-isComplete').checked = item.isComplete;
  document.getElementById('editForm').style.display = 'block';
}

function updateItem() {
  const itemId = document.getElementById('edit-id').value;

  const item = {
    id: parseInt(itemId, 10),
    isComplete: document.getElementById('edit-isComplete').checked,
    name: document.getElementById('edit-name').value.trim()
  };

  fetch(`${uri}/${itemId}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  })
    .then(() => getItems())
    .catch(error => console.error('Unable to update item.', error));

  closeInput();
}

function closeInput() {
  document.getElementById('editForm').style.display = 'none';
}

function displayItems(data) {
  const tBody = document.getElementById('todos');
  tBody.innerHTML = '';

  document.getElementById('counter').textContent =
    data.length + (data.length === 1 ? ' to-do item' : ' to-do items');

  data.forEach(item => {
    const tr = tBody.insertRow();

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.disabled = true;
    checkbox.checked = item.isComplete;
    tr.insertCell(0).appendChild(checkbox);

    tr.insertCell(1).appendChild(document.createTextNode(item.name));

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => displayEditForm(item.id));
    tr.insertCell(2).appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteItem(item.id));
    tr.insertCell(3).appendChild(deleteButton);
  });

  todos = data;
}

getItems();