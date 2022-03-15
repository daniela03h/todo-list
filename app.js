console.log("Module loaded!")
let $tituloPrincipal = document.querySelector("#titulo-ppal")
let $taskCounter = document.querySelector("#contador-tareas-pendientes")
let $newTaskForm = document.querySelector(".new-task-form")
let $resertFormButton = document.querySelector(".clear-button")
let $tasksList = document.querySelector(".tasks-list")
let $newTask = document.querySelector(".caja-de-texto")

$newTaskForm.addEventListener("submit", addTask)

let todos = [
  {
    id: 1646783819670,
    description: "Practicas mucho JavaScript",
    isDone: false

  },
  {
    id: 1646783819675,
    description: "Practicas mucho JavaScript",
    isDone: true

  }

];

function addTask(event) {
  event.preventDefault()

  if ($newTask.value === "") {
    return // Detenemos la ejecucion de la funcion
  }

  let newTask = {
    id: new Date().getTime(),
    description: $newTask.value, //$newTask: referencia al input de HTML
    isDone: false
  }

  todos.push(newTask)
  renderTodos()
  $newTask.value = ""
}

function checkTask(posicion) {
  todos[posicion].isDone = todos[posicion].isDone === true ? false : true
  renderTodos()
}

function renderPendingTasks() {
  const pendingsTasks = todos.filter(function (task) {
    const noEstaTerminada = task.isDone == false
    return noEstaTerminada
  })

  const caunterPendingTasks = pendingsTasks.length
  $taskCounter.innerHTML = `${caunterPendingTasks} ${caunterPendingTasks > 1 ? "Tareas Pendientes" : "Tarea Pendiente"}`

}

function renderTodos() {
  renderPendingTasks()
  $tasksList.innerHTML = ""
  let renderedTasks = todos.map(function (task) {
    return `
    <li class="task-list-item">
        <button class="button-list check-task-button">
          <i 
          class="fa-regular fa-circle-check ${task.isDone === true ? "fa-circle-check-done" : ""}"
          ></i>
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

  const $checkButtons = document.querySelectorAll(".check-task-button")
  $checkButtons.forEach(function ($checkButton, posicion) {
    $checkButton.addEventListener("click", function(){ 
      checkTask(posicion)})
  })
}

renderTodos()