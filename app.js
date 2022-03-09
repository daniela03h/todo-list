console.log("Module loaded!")
let $tituloPrincipal = document.querySelector("#titulo-ppal")
let $taskCounter = document.querySelector("#contador-tareas-pendientes")
let $newTaskForm = document.querySelector(".new-task-form")
let $resertFormButton = document.querySelector(".clear-button")
let $tasksList = document.querySelector(".tasks-list")

let todos = [
  {
    id: 1646783819670,
    description: "Practicas mucho JavaScript",
    isDone: false

  },
  {
    id: 1646783819675,
    description: "Practicas mucho JavaScript",
    isDone: false

  }

];

function renderTodos() {
  $tasksList.innerHTML = ""
  let renderedTasks = todos.map(function (task) {
    return`
    <li class="task-list-item">
        <button class="button-list check-task-button">
          <i class="fa-regular fa-circle-check"></i>
        </button>
        <span class="task-description">
        ${task.description}
        </span>
        <button type="button" class="button-list remove-task-button">
          <i class="fa-regular fa-trash-can"></i>
        </button>
      </li> `
  })
  $tasksList.innerHTML = renderedTasks.join("")
}

renderTodos()