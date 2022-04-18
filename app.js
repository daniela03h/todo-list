console.log('Module loaded!');
let todos = [];
let $tituloPrincipal = document.querySelector('#titulo-ppal');
let $taskCounter = document.querySelector('#contador-tareas-pendientes');
let $newTaskForm = document.querySelector('.new-task-form');
let $resertFormButton = document.querySelector('.clear-button');
let $tasksList = document.querySelector('.tasks-list');
let $newTask = document.querySelector('.caja-de-texto');

window.addEventListener('load', function () {
  const savedTodos = JSON.parse(window.localStorage.getItem('todos'));
  todos = savedTodos || []; // en caso de que saved todos sea null o undefined ponemos por defecto un array vacio
  renderDate();
  renderTodos();
});

$newTaskForm.addEventListener('submit', addTask);

function addTask(event) {
  event.preventDefault();

  if ($newTask.value === '') {
    return; // Detenemos la ejecucion de la funcion
  }

  let newTask = {
    id: new Date().getTime(),
    description: $newTask.value, //$newTask: referencia al input de HTML
    isDone: false,
  };

  todos.push(newTask);
  saveTodos();
  renderTodos();
  $newTask.value = '';
}

function checkTask(posicion) {
  todos[posicion].isDone = todos[posicion].isDone === true ? false : true;
  saveTodos();
  renderTodos();
}

function removeTask(posicion) {
  todos = todos.filter(function (_, indice) {
    return indice !== posicion;
  });
  saveTodos();
  renderTodos();
}

function renderDate() {
  const daysOfWeek = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sabado',
  ];
  const months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
  const date = new Date();
  const day = date.getDate();
  const dayOfWeek = daysOfWeek[date.getDay()];
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  $tituloPrincipal.innerHTML = `${dayOfWeek}, ${day} ${month} ${year}`;
}

function renderPendingTasks() {
  const pendingsTasks = todos.filter(function (task) {
    const noEstaTerminada = task.isDone == false;
    return noEstaTerminada;
  });

  const caunterPendingTasks = pendingsTasks.length;
  $taskCounter.innerHTML = `${caunterPendingTasks} ${
    caunterPendingTasks > 1 ? 'Tareas Pendientes' : 'Tarea Pendiente'
  }`;
}

function saveTodos() {
  window.localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos() {
  renderPendingTasks();
  $tasksList.innerHTML = '';
  let renderedTasks = todos.map(function (task) {
    return `
    <li class="task-list-item">
        <button class="button-list check-task-button">
          <i 
          class="fa-regular fa-circle-check ${
            task.isDone === true ? 'fa-circle-check-done' : ''
          }"
          ></i>
        </button>
        <span class="task-description">
        ${task.description}
        </span>
        <button type="button" class="button-list remove-task-button">
          <i class="fa-regular fa-trash-can"></i>
        </button>
      </li> `;
  });
  $tasksList.innerHTML = renderedTasks.join('');

  const $checkButtons = document.querySelectorAll('.check-task-button');
  $checkButtons.forEach(function ($checkButton, posicion) {
    $checkButton.addEventListener('click', function () {
      checkTask(posicion);
    });
  });

  const $removeButtons = document.querySelectorAll('.remove-task-button');
  $removeButtons.forEach(function ($removeButton, posicion) {
    $removeButton.addEventListener('click', function () {
      removeTask(posicion);
    });
  });
}
